Instacation.Models.Photo = Backbone.Model.extend({
  urlRoot: 'api/photos',

  parse: function (jsonObject) {
    return setLocation(jsonObject);
  },

  initialize: function (object) {
    setLocation(object);
  },

  setLocation: function (object) {
    if (object && object.location) {
      this.location = Instacation.Collections.Locations.fetchOrCreateByPlaceID(object.location.place_id);
      delete(object.location);
    }
    return object;
  }
});
