json.extract! album, :id, :owner_id, :title, :location_id, :updated_at, :text, :created_at
json.photos do
  json.array! album.photos, partial: 'api/photos/photo', as: :photo
end
