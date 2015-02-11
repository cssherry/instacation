# Instacation

[Heroku link to be deployed][heroku]

[heroku]: http://www.cssherry.com/

## Minimum Viable Product
Instacation is a clone of Instagram built on Rails and Backbone. Users can:

- [X] View a user's page
- [X] Create accounts and sessions
- [X] Create/delete albums
- [X] Upload/delete photos
- [X] Tag albums with locations

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~0.5 day)
I'll create the user authentication framework that will allow people to sign up, sign in, and view albums. Initially all albums will be public.

[Details][phase-one]

### Phase 2: Create Albums and Photos JSON API and Backbone Views (~2 days)
I will create API routes for albums, then photos, while creating the corresponding Backbone models and collections to fetch the data from these routes. Cloudinary will be implemented for uploading photos to the website.

[Details][phase-two]

### Phase 3: Editing and Tagging Albums/Photos (~2.5 day)
A third party api (probably Google Places), will be used to tag albums with locations. Tagged locations will collect all the albums from that location and display them.

[Details][phase-three]

### Phase 4: Viewing albums and photos on map (~2 day)
Using Google Maps, images and albums will be shown on a map. Albums will be shown on a map on the user's page, and images will be shown on a map on the album show page. Images without locations will be mapped to the albums location or will be grabbed from the image metadata. Albums without locations will grab locations from photos. There will be a navigation bar at the top of the page that will display all the countries, then states, then cities that albums appear.

[Details][phase-four]

### Bonus Features
- [ ] Allow only followers and owner to see an album. Owner will be able to share albums with others using url/passphrase.
- [X] Map albums by location for exploring
- [ ] Search for albums by location
- [ ] Search for photos by caption
- [ ] Use captions to create tags for photos
- [ ] Allow users to select header photo for the album
- [ ] Like albums or photos, display counter of how many likes there are
- [ ] Comment on albums and photos, display counter of how many comments there are
- [ ] Tag users in photos and albums
- [ ] Infinite scroll of albums and photos
- [ ] Support for multiple open session or authentication through omniauth
- [ ] Allow user to edit their own information
- [ ] Alert user when albums/photos liked/commented

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md

## Technology used:
### Rails
- CRUD functions
- Complex forms
- self-implemented Authentication
- Bootstrap
- Partials, helpers
- Routing
- File upload (Cloudinary)
- Pagination
- 3rd Party APIs
- delayed_job
- *Considering: ActionMailer/Sendgrid, omniauth*

### JavaScript/Backbone
- jQuery
  - jQuery UI: draggable/sortable
- AJAX
- Backbone
- Custom API for Backbone.
