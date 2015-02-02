# Phase 3: Editing and Displaying Posts

## Rails
### Models
* Location
* Tagging

### Controllers
* Api::LocationsController (create, destroy, index, show)

### Views
* locations/show.json.jbuilder

## Backbone
### Models
* Location (parses nested 'albums' association)

### Collections

### Views
* PhotoForm (link to this from AlbumShow and UserShow views)
* LocationShow (composite view, contains AlbumItem views)

## Gems/Libraries
* Filepicker
* Google Places API
