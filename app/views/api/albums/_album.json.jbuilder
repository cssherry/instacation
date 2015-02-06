json.extract! album, :id, :owner_id, :title, :updated_at, :created_at
json.photos do
  json.array! album.photos, partial: 'api/photos/photo', as: :photo
end