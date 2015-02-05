Instacation.Views.PhotoForm = Backbone.View.extend({

  template: JST['photos/photo_form'],

  tagName: 'div="photo-create form-group"',

  initialize: function (options) {
    this.albumView = options.albumView;
  },

  events: {
    'submit .photo-create': 'createPhoto',
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var $filePickerInput = this.$('input[type=filepicker-dragdrop]');
    filepicker.constructWidget($filePickerInput[0]);
    return this;
  },

  createPhoto: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().photo;
    var album_id = this.albumView.model.id;
    params.album_id = album_id
    var urls = params.photo_url.split(",");

    var photo = new Instacation.Models.Photo();
    urls.forEach(function (url) {
        params.photo_url = url;
        photo.save(params,{
          success: function(){
            this.albumView.model.photos().add(photo);
            this.albumView.addPhotoItems(photo, this.albumView.addSubviewFront);
            this.$el.empty();
          }.bind(this)
        });
    }.bind(this));
  },
});
