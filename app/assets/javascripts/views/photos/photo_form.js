Instacation.Views.PhotoForm = Backbone.View.extend({

  template: JST['photos/photo_form'],

  tagName: 'div="photo-create form-group"',

  initialize: function (options) {
    this.albumView = options.albumView;
    this.photoView = options.photoView;
  },

  events: {
    'submit .photo-create': 'savePhoto',
  },

  render: function(){
    var content = this.template({photoView: this.photoView});
    this.$el.html(content);
    var $filePickerInput = this.$('input[type=filepicker-dragdrop]');
    filepicker.constructWidget($filePickerInput[0]);
    return this;
  },

  savePhoto: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().photo;
    if (params.photo_url === "") {
      delete params.photo_url;
    }
    if (this.albumView) {
      this.saveNewPhoto(params);
    } else {
      this.updatePhoto(params);
    }
  },

  saveNewPhoto: function (params) {
    var album_id = this.albumView.model.id;
    params.album_id = album_id;
    var urls = params.photo_url.split(",");
    var photo = new Instacation.Models.Photo();
    urls.forEach(function (url) {
        params.photo_url = url;
        photo.save(params,{
          success: function(){
            this.albumView.model.photos().add(photo);
            this.albumView.addPhotoItems(photo, this.albumView.addSubviewFront);
            this.albumView.hidePhotoForm();
          }.bind(this)
        });
    }.bind(this));
  },

  updatePhoto:function (params) {
    var photo = this.photoView.model;
    photo.save(params, {
      success: function () {
        this.photoView.$('.caption').html(photo.escape('caption'));
        this.photoView.$('img').attr('src', photo.escape('photo_url'))
        this.photoView.hidePhotoForm();
      }.bind(this)
    });
  },
});
