json.partial! 'api/locations/location_only', location: location
json.photos do
  json.array! location.photos, partial: 'api/photos/photo_only', as: :photo
end
json.albums do
  json.array! location.albums, partial: 'api/albums/album_no_location', as: :album
end
