# Phase 2: Create Albums and Photos JSON API and Backbone Views

## Rails
### Models
* Album
  * name
  * privacy
  * location
  * main picture (by default first photo)

* Photo
  * album_id
  * url
  * caption (automatically create tags out of @ or #)
  * weight (by default 0.0)
  * optional location

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
* UserShow (composite view, contains AlbumItem subviews, and link to AlbumForm)
* AlbumItem
* AlbumShow (composite view, contains PhotoShow subviews)
* PhotoShow
* AlbumForm

## Gems/Libraries
