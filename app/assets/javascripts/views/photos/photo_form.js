Instacation.Views.PhotoForm = Backbone.View.extend({

  template: JST['photos/photo_form'],

  tagName: 'div="photo-create"',

  initialize: function (options) {
    this.albumView = options.albumView;
  },

  events: {
    'submit .photo-create': 'createPhoto',
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var $filePickerInput = this.$('input[type=filepicker]');
    filepicker.constructWidget($filePickerInput[0]);
    return this;
  },

  createPhoto: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().photo;
    params.album_id = this.albumView.model.id;
    var photo = new Instacation.Models.Photo();
    photo.save(params,{
      success: function(){
        this.albumView.model.photos().add(photo);
        this.albumView.addPhotoItems(photo, this.albumView.addSubviewFront);
        this.$el.empty();
      }.bind(this)
    });
  },
});
