Instacation.Views.PhotoForm = Backbone.View.extend({

  template: JST['photos/photo_form'],

  tagName: 'div class="photo-create modal fade"',

  initialize: function (options) {
    this.albumView = options.albumView;
    this.photoView = options.photoView;
    this.albums = options.albums;
    if (this.photoView) this.currentAlbumId = this.photoView.model.escape("album_id");
    this.photoUrls = [];
    this.public_id = [];
  },

  events: {
    'submit .photo-create': 'saveNewPhoto',
    'submit .photo-update': 'updatePhoto',
    'click .choose-photo': 'selectPhotos',
    'dragenter .choose-photo': 'selectPhotos',
  },

  render: function(){
    if(this.photoView && this.photoView.getLocationHash()) {
      var locationHash = this.photoView.getLocationHash();
      var photoLocation = locationHash["Photo Location"];
      var albumLocation = locationHash["Album Location"];
    }

    var content = this.template({photoView: this.photoView, location: photoLocation, locationPlaceholder: albumLocation});
    this.$el.html(content);
    this.addAlbums(this.$(".album-choices"));
    var input = this.$('.location-picker')[0];
    this.autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(this.autocomplete, 'place_changed', this.setLocationChanged.bind(this));
    return this;
  },

  addAlbums: function ($el) {
    if (this.photoView) {
      var albumId = this.photoView.model.escape("album_id");
    } else if (this.albumView.model.escape("owner_id")) {
      var albumId = this.albumView.model.id;
    }
    $el.append($("<option>").text("Select an Album"));
    this.albums.forEach(function (album) {
      var option = $("<option>").val(album.id).text(album.escape("title"));
      if (albumId && parseInt(albumId) === album.id) {
        option.attr("selected", "selected");
      }
      $el.append(option);
    }.bind(this));
    return $el;
  },

  setLocationChanged: function (event) {
      this.locationChanged = true;
  },

  selectPhotos: function (event) {
    event.preventDefault();
    cloudinary.openUploadWidget({ cloud_name: cloud_name, upload_preset: upload_preset},
      function(error, results) {
        this.savePhotosUrl(error, results);
      }.bind(this), false);
  },

  savePhotosUrl: function (error, results) {
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

  saveNewPhoto: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().photo;
    if (!params.album_id) {
      params.album_id = this.albumView.model.id;
    }
    if (this.locationChanged) {
      this.saveLocation(function (location) {
        params['location_id'] = location.escape('place_id');
        this.saveNewPhotoModel(params, location);
      }.bind(this));
    } else {
      this.saveNewPhotoModel(params);
    }
  },

  saveNewPhotoModel: function (params, location) {
    var photo = new Instacation.Models.Photo();
    var errors = [];

    if (this.photoUrls.length === 0) {
      errors.push("Add some photos");
    }

    if (params.album_id === "Select an Album") {
      errors.push("Select an Album");
    }

    if (errors.length !== 0) {
      this.$(".alert-warning").removeClass("hidden");
      this.$(".error-text").text(errors.join(". "));
    }

    this.photoUrls.forEach(function (url, index) {
        if (photo.locations()) photo.locations().set(location);
        params.photo_url = url;
        params.cloudinary_id = this.public_id[index];
        photo.save(params,{
          success: function(){
            if (this.albumView.model.escape("owner_id")) {
              this.albumView.model.photos().add(photo);
              this.albumView.addPhotoItems(photo, this.albumView.addSubviewFront, this.$el);
              Instacation.resize();
            } else {
              this.albums.get(photo.escape("album_id")).photos().add(photo);
              this.$el.modal("hide");
            }
            this.$(".alert-warning").addClass("hidden");
          }.bind(this),
          error: function () {
            var errors = arguments[1];
            this.$(".alert-warning").removeClass("hidden");
            this.$(".error-text").text(errors);
          }.bind(this)
        });
    }.bind(this));
  },

  updatePhoto:function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().photo;
    if ($(event.currentTarget).serializeJSON().location === "") {
      params['location_id'] = null;
      this.updatePhotoModel(params);
    } else if (this.locationChanged) {
      this.saveLocation(function (location) {
        params['location_id'] = location.escape('place_id');
        this.updatePhotoModel(params, location);
      }.bind(this));
    } else {
      this.updatePhotoModel(params);
    }
  },

  updatePhotoModel: function (params, location) {
    var photo = this.photoView.model;
    if (this.public_id.length !== 0) {
      params.photo_url = this.photoUrls[0];
      params.cloudinary_id = this.public_id[0];
    }
    photo.save(params, {
      success: function () {
        if (location) {
          photo.locations().set(location);
          this.photoView.$('.location-name').html(this.photoView.parseLocation(this.photoView.getLocationHash()));
        } else if (!photo.escape('location_id') && !this.photoView.getLocationHash()) {
          this.photoView.$('.location-name').text("");
        } else if (!photo.escape('location_id') && this.photoView.getLocationHash()) {
          this.photoView.$('.location-name').html(this.photoView.parseLocation(this.photoView.getLocationHash()));
        }
        this.photoView.$('.caption').html(photo.escape('caption'));
        if (this.public_id.length !== 0) {
          var photoUrl = $.cloudinary.image(this.public_id[0], { width: 300, height: 300, crop: 'fill' })[0].src;
          this.photoView.$('img').attr('src', photoUrl);
        }
        if (this.currentAlbumId !== photo.escape("album_id")) {
          this.photoView.remove();
        }
        Instacation.resize();
        this.$(".alert-warning").addClass("hidden");
        this.$el.modal("hide");
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
  },
});
