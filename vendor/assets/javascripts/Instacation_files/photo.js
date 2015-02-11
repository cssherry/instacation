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
      this.locations().set(object.location);
      delete(object.location);
    }
    if (object && object.location) {
      this.locations().set(object.location);
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
});
