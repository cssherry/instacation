Instacation.Views.AlbumForm = Backbone.View.extend({

  template: JST['albums/album_form'],

  tagName: 'div="album-create"',

  initialize: function (options) {
    this.userView = options.userView;
    this.albumView = options.albumView;
  },

  events: {
    'submit .album-create': 'createAlbum',
  },

  render: function(){
    var content = this.template({albumView: this.albumView});
    this.$el.html(content);
    if (!this.albumView) {
      var $filePickerInput = this.$('input[type=filepicker-dragdrop]');
      filepicker.constructWidget($filePickerInput[0]);
    }
    return this;
  },

  createAlbum: function (event) {
    event.preventDefault();
    var albumParams = $(event.currentTarget).serializeJSON().album;

    if (this.userView) {
      var photoParams = $(event.currentTarget).serializeJSON().photo;
      this.saveNewAlbum(albumParams, photoParams);
    } else {
      this.updateAlbum(albumParams);
    }
  },

  saveNewAlbum: function (albumParams, photoParams) {
    var album = new Instacation.Models.Album();
    if (photoParams.photo_url !== "") {
      photoUrls = photoParams.photo_url.split(",");
    }
    album.save(albumParams,{
      success: function(){
        this.userView.model.albums().add(album);
        if (photoParams.photo_url !== "") {
          this.saveAlbumPhotos(photoParams, photoUrls, album);
        } else {
          this.userView.addAlbumItems(album, this.userView.addSubviewFront);
        }
        this.userView.hideAlbumForm();
      }.bind(this)
    });
  },

  saveAlbumPhotos: function (photoParams, photoUrls, album) {
    photoParams.album_id = album.id;
    var photo = new Instacation.Models.Photo();
    photoUrls.forEach(function (url, index) {
      photoParams.photo_url = url;
      photo.save(photoParams,{
        success: function(){
          album.photos().add(photo);
          if (index === 0) {
            this.userView.addAlbumItems(album, this.userView.addSubviewFront);
          }
        }.bind(this)
      });
    }.bind(this));
  },

  updateAlbum: function (albumParams) {
    var album = this.albumView.model;
    album.save(albumParams,{
      success: function(){
        this.albumView.$('.title').html(album.escape('title'));
        this.albumView.hideAlbumForm();
      }.bind(this)
    });
  },
});
