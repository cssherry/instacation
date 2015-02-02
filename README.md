# Instacation

[Heroku link to be deployed][heroku]

[heroku]: http://www.cssherry.com/

## Minimum Viable Product
Instacation is a clone of Instagram built on Rails and Backbone. Users can:

- [ ] Create accounts and sessions
- [ ] Create/delete albums
- [ ] Upload/delete photos
- [ ] Rearrange photos
- [ ] Tag albums with locations
- [ ] Add captions/tags to photos
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
I'll create the user authentication framework that will allow people to sign up, sign in, and view albums. This will not be required to view public albums, but will be required to view private albums.

[Details][phase-one]

### Phase 2: JSON API and First Backbone Views (~2 days)
I will add API routes to serve blog and post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, the existing Rails views will have been ported over to Backbone.

[Details][phase-two]

### Phase 3: Editing and Displaying Posts (~2 days)
I plan to use third-party libraries to add functionality to the `PostForm` and
`PostShow` views in this phase. First I'll need to add a Markdown editor to the
`PostForm`, and make sure that the Markdown is properly escaped and formatted in
the `PostShow` view. I also plan to integrate Filepicker for file upload so
users can add images to blog posts.

[Details][phase-three]

### Phase 4: User Feeds (~1-2 days)
I'll start by adding a `feed` route that uses the `current_user`'s
`subscribed_blogs` association to serve a list of blog posts ordered
chronologically. On the Backbone side, I'll make a `FeedPosts` collection that
fetches from the new route, then create a `FeedShow` view that uses the new
collection. Ultimately, this will be the page users see after logging in.

[Details][phase-four]

### Phase 5: Searching for Blogs and Posts (~2 days)
I'll need a `search` route that accepts a query in the params. The controller
action will run two queries: one to find blogs where the `title` matches
the search term, and another to find posts where one of their associated `Tag`s
matches the search term. In Backbone, I plan to implement a `SearchResults` view
that will display matching blogs in one column and matching posts in another.

[Details][phase-five]

### Bonus Features
- [ ] Search for albums by location
- [ ] Search for photos by caption
- [ ] Map albums by location for exploring
- [ ] Like albums or photos, display counter of how many likes there are
- [ ] Comment on albums and photos, display counter of how many comments there are
- [ ] Infinite scroll of albums and photos
- [ ] Support for multiple open sessions
- [ ] Alert user when albums/photos liked/commented

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
