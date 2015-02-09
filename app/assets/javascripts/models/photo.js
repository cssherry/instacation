Instacation.Models.Photo = Backbone.Model.extend({
  urlRoot: 'api/photos',

  parse: function (jsonObject) {
    return this.setLocation(jsonObject);
  },

  initialize: function (object) {
    this.setLocation(object);
  },

  setLocation: function (object) {
    if (object && object.location) {
      this.location(object);
      delete(object.location);
    }
    return object;
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
