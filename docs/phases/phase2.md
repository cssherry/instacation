# Phase 2: Create Albums and Photos JSON API and Backbone Views

## Rails
### Models
* Album
  * location
  * main picture (by default first photo)

* Photo
  * album_id
  * url
  * caption (automatically create tags out of @ or #)
  * weight (by default 0.0)

### Controllers
Api::AlbumsController (create, destroy, index, show, update)
Api::PhotosController (create, destroy, show, update)

### Views
* blogs/show.json.jbuilder

## Backbone
### Models
* Album (parses nested `photo` association)
* Photo

### Collections
* Album
* Photo

### Views
* UserShow (composite view, contains AlbumItem subviews)
* AlbumShow (composite view, contains PhotoShow subviews)
* PhotoShow

## Gems/Libraries
