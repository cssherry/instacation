# Phase 2: Create Albums and Photos JSON API and Backbone Views

## Rails
### Models
* Album
* Photo

### Controllers
Api::AlbumsController (create, destroy, show, update)
Api::PhotosController (create, destroy, show, update)

### Views
* api/albums/show.json.jbuilder
* api/albums/_album.json.jbuilder
* api/photos/_photo.json.jbuilder

## Backbone
### Models
* Album (parses nested `photo` association)
* UserData (parses nested `album` and `photo` association)
* Photo

### Collections
* Albums
* Photos

### Views
* UserShow (composite view, contains AlbumItem subviews, and link to AlbumForm)
* AlbumItem
* AlbumShow (composite view, contains PhotoShow subviews)
* PhotoShow
* AlbumForm

## Gems/Libraries
* Filepicker
