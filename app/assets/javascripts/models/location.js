Instacation.Models.Location = Backbone.Model.extend({
  urlRoot: 'api/locations',

  parse: function (jsonObject) {
    return setLocationPhotos(jsonObject);
  },

  initialize: function (object) {
    setLocationPhotos(object);
  },

  setLocationPhotos: function (object) {
    if (object && object.photos) {
      this.photos().set(object.photos);
      delete(object.photos);
    }
    if (object && object.location) {
      this.location = Instacation.Collections.Locations.fetchOrCreateByPlaceID(object.location.place_id);
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
});
