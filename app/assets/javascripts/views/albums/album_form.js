Instacation.Views.AlbumForm = Backbone.View.extend({

  template: JST['albums/album_form'],

  tagName: 'div="album-create"',

  initialize: function (options) {
    this.userView = options.userView;
    this.albumView = options.albumView;
    this.photoUrls = [];
    this.public_id = [];
  },

  events: {
    'submit .album-create': 'saveAlbum',
    'click .choose-photo': 'selectPhotos',
    'dragenter .choose-photo': 'selectPhotos',
  },

  render: function(){
    if(albumView) var location = this.albumView.locations().first.escape('description');
    google.maps.places.PlacesService.getDetails();
    var content = this.template({albumView: this.albumView, location:location});
    this.$el.html(content);
    var input = this.$('.location-picker')[0];
    this.autocomplete = new google.maps.places.Autocomplete(input);
    return this;
  },

  selectPhotos: function () {
    cloudinary.openUploadWidget({ cloud_name: cloud_name, upload_preset: upload_preset},
      function(error, results) {
        this.savePhotos(error, results);
      }.bind(this), false);
  },

  savePhotos: function (error, results) {
    results && results.forEach(function(result){
                this.photoUrls.push(result.url);
                this.public_id.push(result.public_id);
              }.bind(this));
    var uploadedFiles = $("<p>").text(this.public_id.join(", "));
    this.$(".chosen-photos").html(uploadedFiles);
  },

  saveAlbum: function (event) {
    event.preventDefault();
    var albumParams = $(event.currentTarget).serializeJSON().album;
    if ($(event.currentTarget).serializeJSON().location) {
      this.saveLocation(function (location) {
        albumParams['location_id'] = location.escape('place_id');
        if (this.userView) {
          var photoParams = $(event.currentTarget).serializeJSON().photo;
          this.saveNewAlbum(albumParams, photoParams, location);
        } else {
          this.updateAlbum(albumParams, location);
        }
      }.bind(this));
    } else {
      if (this.userView) {
        var photoParams = $(event.currentTarget).serializeJSON().photo;
        this.saveNewAlbum(albumParams, photoParams);
      } else {
        this.updateAlbum(albumParams);
      }
    }
  },

  saveNewAlbum: function (albumParams, photoParams, location) {
    var album = new Instacation.Models.Album();
    album.save(albumParams,{
      success: function(){
        album.locations().set(location);
        this.userView.model.albums().add(album);
        if (this.photoUrls.length !== 0) {
          this.saveAlbumPhotos(photoParams, album);
        } else {
          this.userView.addAlbumItems(album, this.userView.addSubviewFront);
        }
        this.userView.hideAlbumForm();
      }.bind(this)
    });
  },

  saveAlbumPhotos: function (photoParams, album) {
    photoParams.album_id = album.id;
    var photo = new Instacation.Models.Photo();
    this.photoUrls.forEach(function (url, index) {
      photoParams.photo_url = url;
      photoParams.cloudinary_id = this.public_id[index];
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

  updateAlbum: function (albumParams, location) {
    var album = this.albumView.model;
    album.save(albumParams,{
      success: function(){
        album.locations().set(location);
        this.albumView.$('.title').html(album.escape('title'));
        this.albumView.hideAlbumForm();
      }.bind(this)
    });
  },

  saveLocation: function (callback) {
    var place = this.autocomplete.getPlace();
    var locationTag = {};
    locationTag['place_id'] = place.place_id;
    locationTag['name'] = place.name;
    place.address_components.forEach(function (address_component, index) {
      if (address_component.types[0] === 'country') {
        var street_number = place.address_components[index - 4];
        var street = place.address_components[index - 3];
        var city = place.address_components[index - 2];
        var state = place.address_components[index - 1];

        if (street_number) locationTag['street_number'] = street_number.long_name;
        if (street) locationTag['street'] = street.long_name;
        if (city) locationTag['city'] = city.long_name;
        if (state) locationTag['state'] = state.short_name;
        locationTag['country'] = place.address_components[index].short_name;
      }
    });
    var locations = new Instacation.Collections.Locations();
    var location = locations.fetchOrCreateByPlaceID(locationTag, function (location) {
      callback.call({}, location);
    }.bind(this));
  }
});
