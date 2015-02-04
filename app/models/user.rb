class User < ActiveRecord::Base
  validates :first_name, :last_name, :username, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true  }
  validate :unique_username?, on: :create

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = unrepeated_session_token
    self.save!
    self.session_token
  end

private
  def unique_username?
    if self.class.find_by(username: self.username)
      errors[:username] << 'already taken'
    end
  end

  def ensure_session_token
    self.session_token ||= unrepeated_session_token
  end

  def unrepeated_session_token
    session_token = SecureRandom.urlsafe_base64(16)
    until self.class.find_by(session_token: session_token).nil?
      session_token = SecureRandom.urlsafe_base64(16)
    end

    return session_token
  end
end
