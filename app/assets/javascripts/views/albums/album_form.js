Instacation.Views.AlbumForm = Backbone.View.extend({

  template: JST['albums/album_form'],

  tagName: 'div="album-create"',

  initialize: function (options) {
    this.userView = options.userView;
    this.albumView = options.albumView;
    this.photoUrls = [];
    this.public_id = [];
    this.locationChanged = false;
  },

  events: {
    'submit .album-create': 'saveNewAlbum',
    'submit .album-update': 'updateAlbum',
    'click .choose-photo': 'selectPhotos',
    'dragenter .choose-photo': 'selectPhotos',
  },

  render: function(){
    if(this.albumView && this.albumView.model.locations().first()) {
      var location = this.albumView.model.locations().first().escape('name');
    }
    var content = this.template({albumView: this.albumView, location: location});
    this.$el.html(content);
    var input = this.$('.location-picker')[0];
    this.autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(this.autocomplete, 'place_changed', this.setLocationChanged.bind(this));
    return this;
  },

  setLocationChanged: function (event) {
    this.locationChanged = true;
  },

  selectPhotos: function () {
    cloudinary.openUploadWidget({ cloud_name: cloud_name, upload_preset: upload_preset},
      function(error, results) {
        this.savePhotosUrls(error, results);
      }.bind(this), false);
  },

  savePhotosUrls: function (error, results) {
    results && results.forEach(function(result){
                this.photoUrls.push(result.url);
                this.public_id.push(result.public_id);
              }.bind(this));
    var uploadedFiles = $("<p>").text(this.public_id.join(", "));
    this.$(".chosen-photos").html(uploadedFiles);
  },

  saveNewAlbum: function (event) {
    event.preventDefault();
    var albumParams = $(event.currentTarget).serializeJSON().album;
    var photoParams = $(event.currentTarget).serializeJSON().photo;
    if (this.locationChanged) {
      this.saveLocation(function (location) {
        albumParams['location_id'] = location.escape('place_id');
        this.saveNewAlbumModel(albumParams, photoParams, location);
      }.bind(this));
    } else {
      this.saveNewAlbumModel(albumParams, photoParams);
    }
  },

  saveNewAlbumModel: function (albumParams, photoParams, location) {
    var album = new Instacation.Models.Album();
    album.save(albumParams,{
      success: function(){
        album.locations().set(location);
        this.userView.model.albums().add(album);
        if (this.photoUrls.length !== 0) {
          this.saveNewAlbumPhotos(photoParams, album);
        } else {
          this.userView.addAlbumItems(album, this.userView.addSubviewFront);
        }
        this.userView.hideAlbumForm();
      }.bind(this)
    });
  },

  saveNewAlbumPhotos: function (photoParams, album) {
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

  updateAlbum: function (event) {
    event.preventDefault();
    var albumParams = $(event.currentTarget).serializeJSON().album;
    if ($(event.currentTarget).serializeJSON().location === "") {
      albumParams['location_id'] = null;
      this.updateAlbumModel(albumParams);
    } else if (this.locationChanged) {
      this.saveLocation(function (location) {
        albumParams['location_id'] = location.escape('place_id');
        this.updateAlbumModel(albumParams, location);
      }.bind(this));
    } else {
      this.updateAlbumModel(albumParams);
    }
  },

  updateAlbumModel: function (albumParams, location) {
    var album = this.albumView.model;
    album.save(albumParams,{
      success: function(){
        if (location) {
          album.locations().set(location);
          var locationName = location.escape('state') + ", " + location.escape('country');
          this.albumView.$('.location-name').text(locationName);
        } else if (!album.escape('location_id')) {
          this.albumView.$('.location-name').text("");
        }
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
