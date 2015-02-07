# Phase 2: Create Albums and Photos JSON API and Backbone Views

## Rails
### Models
* Album
* Photo

### Controllers
* Api::AlbumsController (create, destroy, show, update)
* pi::PhotosController (create, destroy, show, update)

### Views
* api/albums/show.json.jbuilder
* api/albums/_album.json.jbuilder
* api/photos/_photo.json.jbuilder

## Backbone
### Router
* UserDataRouter (controls all the views)

### Models
* UserData (parses nested `album` and `photo` association)
* Album (parses nested `photo` association)
* Photo

### Collections
* Albums
* Photos

### Views
* UserShow (composite view, contains AlbumItem subviews, and link to AlbumForm)
* AlbumForm
* AlbumItem (composite view, contains AlbumForm subview)
* AlbumShow (composite view, contains AlbumItem subviews)
* PhotoForm
* PhotoItem (composite view, contains PhotoFOrm subview)
* PhotoShow (composite view, contains PhotoItem subview)

## Gems/Libraries
* Filepicker, then coverted to Cloudinary
