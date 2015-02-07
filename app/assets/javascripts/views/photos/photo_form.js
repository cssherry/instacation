Instacation.Views.PhotoForm = Backbone.View.extend({

  template: JST['photos/photo_form'],

  tagName: 'div="photo-create form-group"',

  initialize: function (options) {
    this.albumView = options.albumView;
    this.photoView = options.photoView;
    this.photoUrls = [];
    this.public_id = [];
  },

  events: {
    'submit .photo-create': 'savePhoto',
    'click .choose-photo': 'selectPhotos',
    'dragenter .choose-photo': 'selectPhotos',
  },

  render: function(){
    var content = this.template({photoView: this.photoView});
    this.$el.html(content);
    // PUT CLOUDERY STUFF HERE
    return this;
  },

  selectPhotos: function () {
    cloudinary.openUploadWidget({ cloud_name: cloud_name, upload_preset: upload_preset},
      function(error, results) {
        this.savePhotos(error, results);
      }.bind(this), false);
  },

  savePhotos: function (error, results) {
    if (this.albumView) {
      results.forEach(function(result){
        this.photoUrls.push(result.url);
        this.public_id.push(result.public_id);
      }.bind(this));
    } else {
      this.photoUrls = [results[0].url];
      this.public_id = [results[0].public_id];
    }

    var uploadedFiles = $("<p>").text(this.public_id.join(", "));
    this.$(".chosen-photos").html(uploadedFiles);
  },

  savePhoto: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().photo;
    if (this.albumView) {
      this.saveNewPhoto(params);
    } else {
      this.updatePhoto(params);
    }
  },

  saveNewPhoto: function (params) {
    var album_id = this.albumView.model.id;
    params.album_id = album_id;
    var photo = new Instacation.Models.Photo();
    this.photoUrls.forEach(function (url, index) {
        params.photo_url = url;
        params.cloudinary_id = this.public_id[index];
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
    if (this.public_id.length !== 0) {
      params.photo_url = this.photoUrls[0];
      params.cloudinary_id = this.public_id[0];
    }
    photo.save(params, {
      success: function () {
        this.photoView.$('.caption').html(photo.escape('caption'));
        if (this.public_id.length !== 0) {
          var photoUrl = $.cloudinary.image(this.public_id[0], { width: 300, height: 300, crop: 'fill' })[0].src;
          this.photoView.$('img').attr('src', photoUrl);
        }
        this.photoView.hidePhotoForm();
      }.bind(this)
    });
  },
});
