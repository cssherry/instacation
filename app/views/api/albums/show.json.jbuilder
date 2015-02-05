json.partial! 'api/albums/album', album: @album
json.photos do
  json.array! @album.photos, partial: 'api/photos/photo', as: :photo
end
