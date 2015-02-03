# Phase 2: Create Albums and Photos JSON API and Backbone Views

## Rails
### Models
* Album
* Photo

### Controllers
Api::AlbumsController (create, destroy, index, show, update)
Api::PhotosController (create, destroy, show, update)

### Views
* albums/show.json.jbuilder

## Backbone
### Models
* Album (parses nested `photo` association)
* Photo

### Collections
* Album
* Photo

### Views
* UserShow (composite view, contains AlbumItem subviews, and link to AlbumForm)
* AlbumItem
* AlbumShow (composite view, contains PhotoShow subviews)
* PhotoShow
* AlbumForm

## Gems/Libraries
* Filepicker
