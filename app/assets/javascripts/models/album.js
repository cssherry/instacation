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
      this.location().fetchOrCreateByPlaceID({place_id: object.location.place_id,
                                              street_number: object.location.street_number,
                                              street: object.location.street,
                                              city: object.location.city,
                                              state: object.location.state,
                                              country: object.location.country});
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

  location: function () {
    if (!this._location) {
      this._location = new Instacation.Collections.Locations();
    }
    return this._location.sort();
  }
});
