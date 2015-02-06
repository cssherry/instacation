Instacation.Views.AlbumForm = Backbone.View.extend({

  template: JST['albums/album_form'],

  tagName: 'div="album-create"',

  initialize: function (options) {
    this.userView = options.userView;
  },

  events: {
    'submit .album-create': 'createAlbum',
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    var $filePickerInput = this.$('input[type=filepicker-dragdrop]');
    filepicker.constructWidget($filePickerInput[0]);
    return this;
  },

  createAlbum: function (event) {
    event.preventDefault();
    var albumParams = $(event.currentTarget).serializeJSON().album;
    var photoParams = $(event.currentTarget).serializeJSON().photo;
    var photoUrls = photoParams.photo_url.split(",");
    var album = new Instacation.Models.Album(albumParams);
    album.save({},{
      success: function(){
        this.userView.model.albums().add(album);
        photoParams.album_id = album.id;
        var photo = new Instacation.Models.Photo();
        photoUrls.forEach(function (url) {
            photoParams.photo_url = url;
            photo.save(photoParams,{
              success: function(){
                album.photos().add(photo);
                this.userView.addAlbumItems(album, this.userView.addSubviewFront);
              }.bind(this)
            });
        }.bind(this));
        this.$el.empty();
      }.bind(this)
    });
  },
});
