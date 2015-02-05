json.extract! @user, :id, :first_name, :last_name, :username, :password_digest, :session_token, :created_at, :updated_at
json.albums do
  json.array! @user.albums, partial: 'api/albums/album', as: :album
end
