Instacation.Views.AlbumItem = Backbone.CompositeView.extend({

  template: JST['albums/album_item'],

  initialize: function (options) {
    this.editable = options.editable;
  },

  tagName: 'div class="album-item col-sm-12 col-md-6 col-lg-4"',

  events: {
    'click .delete-album':'destroy',
    'click .edit-album': 'editAlbum',
    'click .close-album-form': 'closeEditAlbum',
    'mouseover img': 'triggerMarker'
  },

  render: function(){
    if (this.model.photos().length !== 0) {
      var cloudinaryId = this.model.photos().first().get('cloudinary_id');
      var modelPhotoUrl = $.cloudinary.image(cloudinaryId, { width: 300, height: 300, crop: 'fill' })[0].src;
    }

    var placeID = this.model.escape('location_id');
    if (placeID) {
      var modelLocation = this.model.locations().first();
    }

    var content = this.template({album: this.model, photoUrl: modelPhotoUrl, editable: this.editable, location: modelLocation});
    this.$el.html(content);

    Instacation.resize();

    return this;
  },

  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  editAlbum: function (event) {
    event.preventDefault();
    var albumForm = new Instacation.Views.AlbumForm({albumView: this});
    this.addSubviewFront(".edit-album-form", albumForm);
    this.$('.edit-album').html('close form');
    this.$('.edit-album').toggleClass('edit-album close-album-form');
  },

  hideAlbumForm: function () {
    var view = this.subviews('.edit-album-form')[0];
    this.removeSubview(".edit-album-form", view);
    this.$('.close-album-form').html('edit');
    this.$('.close-album-form').toggleClass('edit-album close-album-form');
  },

  closeEditAlbum: function (event) {
    event.preventDefault();
    this.hideAlbumForm();
  },

  triggerMarker: function () {
    this.model.trigger('select', this.model);
  },
});
