Instacation.Views.AlbumItem = Backbone.CompositeView.extend({

  template: JST['albums/album_item'],

  initialize: function (options) {
    this.editable = options.editable;
  },

  tagName: 'div class="album-item col-md-6 col-lg-4"',

  events: {
    'click .delete-album':'destroy',
    'mouseover .overlay': 'triggerMarker',
    'mouseout .overlay': 'closeMarker',
  },

  render: function(){
    var modelPhotoUrl = this.getThumbnail();
    var modelLocation = this.getLocation();
    var content = this.template({album: this.model, photoUrl: modelPhotoUrl, editable: this.editable, location: modelLocation});
    this.$el.html(content);
    this.addAlbumForm();
    if (modelLocation) this.$el.
                            addClass(modelLocation.escape("country").split(" ").join("-")).
                            addClass(modelLocation.escape("state").split(" ").join("-")).
                            addClass(modelLocation.escape("city").split(" ").join("-"));

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

  addAlbumForm: function () {
    var albumForm = new Instacation.Views.AlbumForm({albumView: this, id: "albumFormEdit" + this.model.id });
    this.addSubviewFront(".edit-album-form", albumForm);
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
