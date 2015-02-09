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
      this.location(object);
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

  location: function (object) {
   if (!this._location) {
     var objectLocation = {place_id: object.location.place_id,
                           street_number: object.location.street_number,
                           street: object.location.street,
                           city: object.location.city,
                           state: object.location.state,
                           country: object.location.country};
     this.locations().fetchOrCreateByPlaceID(objectLocation,
                                             function (location) {
                                               this._location = location;
                                               return this._location;
                                             }.bind(this));
    } else {
      return this._location;
    }
  }
});
