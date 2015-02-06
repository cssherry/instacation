Instacation.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST['albums/show'],

  initialize: function (options) {
    this.userId = this.model.escape('owner_id');
    this.editable = this.userId == Instacation.currentUserId;
    this.model.photos().each( function (photoItem) {
      this.addPhotoItems(photoItem, this.addSubviewEnd);
    }.bind(this));
    this.render();


    this.listenTo(this.model.photos(), 'add', this.render);
    this.listenTo(this.model.photos(), 'remove', this.removePhotoItem);
  },

  events: {
    'click .open-photo-form': 'createPhotoForm',
    'click .close-form': 'closePhotoForm',
    'sortstop .photos': 'reorderPhotos',
  },

  render: function(){
    var content = this.template({album: this.model, editable: this.editable});
    this.$el.html(content);
    this.attachSubviews();
    this.$('.photos').sortable();
    return this;
  },

  addPhotoItems: function (photoItem, fn) {
    var photoView = new Instacation.Views.PhotoItem({model: photoItem, editable: this.editable, userId: this.userId});
    fn.call(this, ".photos", photoView);
  },

  removePhotoItem: function (photo) {
    var view = _(this.subviews('.photos')).findWhere({ model: photo });
    this.removeSubview(".photos", view);
    this.render();
  },

  createPhotoForm: function (event) {
    event.preventDefault();
    var photoForm = new Instacation.Views.PhotoForm({albumView: this});
    this.addSubviewFront(".photo-form", photoForm);
    this.$('.open-photo-form').html('Close form');
    this.$('.open-photo-form').toggleClass('open-photo-form close-form');
  },

  closePhotoForm: function (event) {
    event.preventDefault();
    this.hidePhotoForm();
  },

  hidePhotoForm: function () {
    var view = this.subviews('.photo-form')[0];
    this.removeSubview(".photo-form", view);
    this.$('.close-form').html('+ New Photo');
    this.$('.close-form').toggleClass('open-photo-form close-form');
  },

  reorderPhotos: function (event) {
  var photos = $(event.target).find('.photo-item');
  photos.each(function (indx, photo) {
    var currentId = $(photo).find('.caption').attr('id');
    var currentPhoto = this.model.photos().get(currentId);
    currentPhoto.save({order: indx});
  }.bind(this));
},
});
