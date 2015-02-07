json.partial! 'api/photos/photo', photo: photo
json.location do
  json.partial! 'api/locations/location_only', location: photo.location
end
