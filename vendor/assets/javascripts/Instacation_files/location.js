Instacation.Models.Location = Backbone.Model.extend({
  urlRoot: 'api/locations',

  parse: function (jsonObject) {
    return this.setAlbumsPhotos(jsonObject);
  },

  initialize: function (object) {
    this.setAlbumsPhotos(object);
  },

  setAlbumsPhotos: function (object) {
    if (object && object.photos) {
      this.photos().set(object.photos);
      delete(object.photos);
    }
    if (object && object.albums) {
      this.albums().set(object.albums);
      delete(object.albums);
    }
    return object;
  },

  photos: function () {
    if (!this._photos) {
      this._photos = new Instacation.Collections.Photos();
    }
    return this._photos.sort();
  },

  albums: function () {
    if (!this._albums) {
      this._albums = new Instacation.Collections.Albums();
    }
    return this._albums.sort();
  },
});
