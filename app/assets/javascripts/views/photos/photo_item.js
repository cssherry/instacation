Instacation.Views.PhotoItem = Backbone.CompositeView.extend({

  template: JST['photos/photo_item'],

  initialize: function (options) {
    this.editable = options.editable;
    this.userId = options.userId;
  },

  tagName: 'div class="photo-item"',

  events: {
    'click .delete-photo':'destroy',
    'click .edit-photo': 'editPhoto',
    'click .close-photo-form': 'closeEditPhoto',
    'mouseover .image': 'triggerMarker',
    'mouseout .image': 'closeMarker',

  },

  render: function(){
    var modelPhotoUrl = this.getThumbnail();

    var modelLocation = this.getLocation();

    var content = this.template({photo: this.model,
                                 editable: this.editable,
                                 photoUrl: modelPhotoUrl,
                                 userId: this.userId,
                                 location: modelLocation});
    this.$el.html(content);

    Instacation.resize();

    return this;
  },

  getThumbnail: function () {
    return $.cloudinary.image(this.model.get('cloudinary_id'), { width: 300, height: 300, crop: 'fill'})[0].src;
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

  editPhoto: function (event) {
    event.preventDefault();
    var photoForm = new Instacation.Views.PhotoForm({photoView: this});
    this.addSubviewFront(".edit-photo-form", photoForm);
    this.$('.edit-photo').html('close form');
    this.$('.edit-photo').toggleClass('edit-photo close-photo-form');
  },

  hidePhotoForm: function () {
    var view = this.subviews('.edit-photo-form')[0];
    this.removeSubview(".edit-photo-form", view);
    this.$('.close-photo-form').html('edit');
    this.$('.close-photo-form').toggleClass('edit-photo close-photo-form');
  },

  closeEditPhoto: function (event) {
    event.preventDefault();
    this.hidePhotoForm();
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
