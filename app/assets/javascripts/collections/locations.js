Instacation.Collections.Locations = Backbone.Collection.extend({

  model: Instacation.Models.Location,

  url: 'api/locations',

  comparator: function (location) {
    return [location.escape('country'), location.escape('state'), location.escape('country'), location.escape('city'), location.escape('street'), location.escape('street_number')];
  },

  fetchOrCreateByPlaceID: function (locationObject) {
    var location = this.findWhere({place_id: locationObject.place_id});
    if (!location) {
      location = new Instacation.Models.Location({ place_id: locationObject.place_id });
      location.fetch({
        success: function () {
          if (!location.id) {
            location = this.create({ place_id: locationObject.place_id,
                                     street_number: locationObject.street_number,
                                     street: locationObject.street,
                                     city: locationObject.city,
                                     state: locationObject.state,
                                     country: locationObject.country});
          }
        }.bind(this)
      });
    } else {
      location.fetch();
    }
    return location;
  }
});
