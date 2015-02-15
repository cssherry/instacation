# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  first_name      :string(255)      not null
#  last_name       :string(255)      not null
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :first_name, :last_name, :username, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true  }
  validate :unique_username?, on: :create

  attr_reader :password

  after_initialize :ensure_session_token
  before_save :capitalize_name, :downcase_username
  after_create :create_seed_album

  has_many :albums,
    class_name: 'Album',
    foreign_key: :owner_id,
    primary_key: :id,
    dependent: :destroy
  has_many :albumLocations, through: :albums, source: :location

  has_many :photos, through: :albums, source: :photo
  has_many :photoLocations, through: :photos, source: :location




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

  def downcase_username
    self.username.downcase!
  end

  def capitalize_name
    self.first_name.capitalize!
    self.last_name.capitalize!
  end

  def create_seed_album
    demo_album = albums.create!(title: 'Demo Album',
                                location_id: 'ChIJ60u11Ni3xokRwVg-jNgU9Yk',
                                description: 'You can add a description of your album here!')
    demo_album.photos.create!([{ caption: 'Photos can have caption!',
                          order: 0,
                          photo_url: 'http://res.cloudinary.com/devybncp2/image/upload/v1423862869/2185-1274886479COqR_f4ty41.jpg',
                          cloudinary_id: '2185-1274886479COqR_f4ty41',
                          location_id: 'ChIJHa4yoSf0t1IR53T-C55D0yY' },
                        { caption: "Drag this photo!",
                          order: 0,
                          photo_url: "http://res.cloudinary.com/devybncp2/image/upload/v1423862870/chickadee_y45tbd.jpg",
                          cloudinary_id: "chickadee_y45tbd",
                          location_id: nil
                        }])
  end
end
