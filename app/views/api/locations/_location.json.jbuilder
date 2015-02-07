json.extract! location, :id, :street_number, :street, :city, :state, :country, :place_id, :updated_at, :created_at
json.photos do
  json.array! album.photos, partial: 'api/photos/photo', as: :photo
end
json.albums do
  json.array! album.albums, partial: 'api/photos/album', as: :album
end
