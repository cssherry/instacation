# Instacation

[Heroku link to be deployed][heroku]

[heroku]: http://www.cssherry.com/

## Minimum Viable Product
Instacation is a clone of Instagram built on Rails and Backbone. Users can:

- [X] Create accounts and sessions
- [X] Create/delete albums
- [X] Upload/delete photos
- [ ] Tag albums with locations
- [ ] View a user's page
- [ ] Subscribe to users or locations
- [ ] View a feed of subscribed users/locations

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

### Phase 4: Subscribing to Users/Albums and Creating Feed (~1 day)
Users will be able to subscribe to other users and albums using polymorphic associations. On the UserShow page, I'll add a set of views that includes albums from the location and users subscribed.

[Details][phase-four]

### Bonus Features
- [ ] Allow only followers and owner to see an album. Owner will be able to share albums with others using url/passphrase.
- [ ] Map albums by location for exploring
- [ ] Search for albums by location
- [ ] Search for photos by caption
- [ ] Use captions to create tags for photos
- [ ] Allow users to select header photo
- [ ] Like albums or photos, display counter of how many likes there are
- [ ] Comment on albums and photos, display counter of how many comments there are
- [ ] Tag users in photos and albums
- [ ] Infinite scroll of albums and photos
- [ ] Support for multiple open sessionI or authentication through omniauth
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
