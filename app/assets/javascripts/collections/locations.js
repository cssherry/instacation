Instacation.Collections.Locations = Backbone.Collection.extend({

  model: Instacation.Models.Location,

  url: 'api/locations',

  comparator: function (location) {
    return [location.escape('country'), location.escape('state'), location.escape('country'), location.escape('city'), location.escape('street'), location.escape('street_number')];
  },

  fetchOrCreateByPlaceID: function (place_id, street_number, street, city, state, country) {
    var location = this.findWhere({place_id: place_id});
    if (!location) {
      location = new Instacation.Models.Location({ place_id: place_id });
      location.fetch({
        success: function () {
          if (!location) {
            location = this.create({ place_id: place_id,
                                     street_number: street_number,
                                     street: street,
                                     city: city,
                                     state: state,
                                     country: country});
          }
        }.bind(this)
      });
    } else {
      location.fetch();
    }
    return location;
  }
});
