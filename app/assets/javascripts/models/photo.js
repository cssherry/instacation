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

  location: function () {
    if (!this._location) {
      this._location = new Instacation.Collections.Locations();
    }
    return this._location.sort();
  }
});
