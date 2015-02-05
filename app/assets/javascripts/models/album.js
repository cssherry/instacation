Instacation.Models.Album = Backbone.Model.extend({
  urlRoot: 'api/albums',

  parse: function (jsonObject) {
    if (jsonObject.photos) {
      this.photos().set(jsonObject.photos);
      delete(jsonObject.photos);
    }
    return jsonObject;
  },

  photos: function () {
    if (!this._photos) {
      this._photos = new Instacation.Collections.Photos();
    }
    return this._photos.sort();
  },
});
