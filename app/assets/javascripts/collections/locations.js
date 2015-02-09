Instacation.Collections.Locations = Backbone.Collection.extend({

  model: Instacation.Models.Location,

  url: 'api/locations',

  comparator: function (location) {
    return [location.escape('country'), location.escape('state'), location.escape('country'), location.escape('city'), location.escape('street'), location.escape('street_number')];
  },

  fetchOrCreateByPlaceID: function (locationObject, callback) {
    var location = this.findWhere({place_id: locationObject.place_id});
    if (!location) {
      this.fetch({
        success: function () {
          location = this.findWhere({place_id: locationObject.place_id});
          if (!location) {
            location = this.create({ place_id: locationObject.place_id,
                                     name: locationObject.name,
                                     street_number: locationObject.street_number,
                                     street: locationObject.street,
                                     city: locationObject.city,
                                     state: locationObject.state,
                                     country: locationObject.country},
                                     {success: function () {
                                        callback.call({},location);
                                     }
                                  });
          } else {
            location.fetch({
              success: function () {
                callback.call({},location);
              }
            });
          }
        }.bind(this)
      });
    } else {
      location.fetch({
        success: function () {
          callback.call({},location);
        }
      });
    }
  },
});
