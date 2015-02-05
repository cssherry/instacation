Instacation.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST['albums/show'],

  initialize: function (options) {
    this.model.fetch({
      success: function () {
        this.model.photos().each( function (photoItem) {
          this.addPhotoItems(photoItem, this.addSubviewEnd);
        }.bind(this));
        this.render();
      }.bind(this)
    });

    this.editable = options.editable;

    this.listenTo(this.model.photos(), 'add', this.render);
    this.listenTo(this.model.photos(), 'remove', this.removePhotoItem);
  },

  events: {
    'click .open-photo-form': 'createPhotoForm',
    'click .close-form': 'closePhotoForm',
  },

  render: function(){
    var content = this.template({album: this.model, editable: this.editable});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addPhotoItems: function (photoItem, fn) {
    var photoView = new Instacation.Views.PhotoItem({model: photoItem, editable: this.editable});
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
    this.$('.photo-form').empty();
    this.$('.close-form').html('Add a new photo');
    this.$('.close-form').toggleClass('open-photo-form close-form');
  },
});
