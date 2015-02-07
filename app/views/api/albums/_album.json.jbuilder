json.partial! 'api/albums/album_no_location', album: album
if album.location
  json.location do
    json.partial! 'api/locations/location_only', location: album.location
  end
end
