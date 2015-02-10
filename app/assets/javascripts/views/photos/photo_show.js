Instacation.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],

  initialize: function (options) {
    this.model.fetch({
      success: function () {
        this.render();
      }.bind(this)
    });

    this.userId = options.userId;
  },

  render: function(){
    var content = this.template({photo: this.model,  userId: this.userId});
    this.$el.html(content);
    var map = this.$('.google-map')[0];
    this.renderMap(map);
    return this;
  },

  renderMap: function (map) {
    var map = new google.maps.Map(map);
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({placeId: this.model.escape('location_id')}, function (result, status) {
                                                            this.renderLocationOnMap(result, status, map);
                                                          }.bind(this));
  },

  renderLocationOnMap: function (results, status, map) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var place = results;

      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
      });

      var infoWindow = new google.maps.InfoWindow();
      infoWindow.setContent('<div><strong>' + place.name + '</strong><br>' + this.parseAddress(place));
      infoWindow.open(map, marker);

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }
    }
  },

  parseAddress: function (place) {
    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
    return address;
  }
});
