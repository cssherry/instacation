Instacation.Views.AlbumItem = Backbone.CompositeView.extend({

  template: JST['albums/album_item'],

  initialize: function (options) {
    this.editable = options.editable;
  },

  tagName: 'div class="album-item col-md-6 col-lg-4"',

  events: {
    'click .delete-album':'destroy',
    'click .edit-album': 'editAlbum',
    'click .close-album-form': 'closeEditAlbum',
    'mouseover .image': 'triggerMarker',
    'mouseout .image': 'closeMarker',
  },

  render: function(){
    var modelPhotoUrl = this.getThumbnail();
    var modelLocation = this.getLocation();
    var content = this.template({album: this.model, photoUrl: modelPhotoUrl, editable: this.editable, location: modelLocation});
    this.$el.html(content);

    return this;
  },

  getThumbnail: function () {
    if (this.model.photos().length !== 0) {
      var cloudinaryId = this.model.photos().first().get('cloudinary_id');
      return $.cloudinary.image(cloudinaryId, { width: 300, height: 300, crop: 'fill' })[0].src;
    }
  },

  getLocation: function () {
    var placeID = this.model.escape('location_id');
    if (placeID) {
      return this.model.locations().first();
    }
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
    if (this.model.get('location_id')) {
      this.model.trigger('selectImage', this.model);
    }
  },

  closeMarker: function () {
    if (this.model.get('location_id')) {
      this.model.trigger('unselectImage', this.model);
    }
  },
});
