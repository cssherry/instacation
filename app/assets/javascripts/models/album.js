Instacation.Models.Album = Backbone.Model.extend({
  urlRoot: 'api/albums',

  parse: function (jsonObject) {
    return this.setLocationPhotos(jsonObject);
  },

  initialize: function (object) {
    this.setLocationPhotos(object);
  },

  setLocationPhotos: function (object) {
    if (object && object.photos) {
      this.photos().set(object.photos);
      delete(object.photos);
    }
    if (object && object.location) {
      this.locations().set(object.location);
      delete(object.location);
    }
    return object;
  },

  photos: function () {
    if (!this._photos) {
      this._photos = new Instacation.Collections.Photos();
    }
    return this._photos.sort();
  },

  locations: function () {
    if (!this._locations) {
      this._locations = new Instacation.Collections.Locations();
    }
    return this._locations;
  },

  getThumbnail: function () {
    if (this.photos().length !== 0) {
      var cloudinaryId = this.photos().first().get('cloudinary_id');
      return $.cloudinary.image(cloudinaryId, { width: 300, height: 300, crop: 'fill' })[0].src;
    }
  },
});
