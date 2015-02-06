Instacation.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],

  initialize: function (options) {
    this.model.fetch({
      success: function () {
        this.render();
      }.bind(this)
    });

    this.editable = options.editable;
  },

  events: {
    'click .open-photo-form': 'createPhotoForm',
    'click .close-form': 'closePhotoForm',
    'sortstop .photos': 'reorderPhotos',
  },

  render: function(){
    var content = this.template({photo: this.model, editable: this.editable});
    this.$el.html(content);
    return this;
  },

  createPhotoForm: function (event) {
    event.preventDefault();
    var photoForm = new Instacation.Views.PhotoForm({photoView: this});
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
