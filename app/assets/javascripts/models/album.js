Instacation.Models.Album = Backbone.Model.extend({
  urlRoot: 'api/albums',

  parse: function (jsonObject) {
    if (jsonObject.photos) {
      this.photos().set(jsonObject.photos);
      delete(jsonObject.photos);
    }
    return jsonObject;
  },

  initialize: function (object) {
    if (object && object.photos) {
      this.photos().set(object.photos);
      delete(object.photos);
    }
  },

  photos: function () {
    if (!this._photos) {
      this._photos = new Instacation.Collections.Photos();
    }
    return this._photos.sort();
  },
});
