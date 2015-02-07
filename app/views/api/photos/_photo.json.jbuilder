json.partial! 'api/photos/photo_only', photo: photo
if photo.location
  json.location do
    json.partial! 'api/locations/location_only', location: photo.location
  end
end
