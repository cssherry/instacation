json.partial! 'api/albums/album', album: album
json.location do
  json.partial! 'api/locations/location_only', location: album.location
end
