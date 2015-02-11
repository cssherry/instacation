Instacation.Views.MapItem = Backbone.View.extend({
  template: JST['maps/map_item'],

  initialize: function (options) {
    this.markers = {};
    this.infoWindows = {};
    this.map(options.mapElement);
    this.$el = options.mapElement;
    this.bounds = new google.maps.LatLngBounds();

    google.maps.event.addListenerOnce(this._map, 'idle', this.zoomOrResize.bind(this));
  },

  render: function(){
    this.renderMap(this.map());
    return this;
  },

  map: function (mapElement){
    if (!this._map && mapElement) {
      this._map = new google.maps.Map(mapElement);
    }
    return this._map;
  },

  renderMap: function (map) {
    var that = this;
    var numberItemWithLocations = 0;
    this.collection.forEach(function (itemView) {
      if (itemView.model.escape('location_id')) {
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({placeId: itemView.model.escape('location_id')}, function (result, status) {
          that.renderLocationOnMap(result, status, map, itemView);
        });
        numberItemWithLocations ++;
      }
    });
    if (numberItemWithLocations === 0) {
      $(this.$el).addClass("hidden");
    }
  },

  renderLocationOnMap: function (results, status, map, itemView) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var place = results;

      this.addMarker(place, map, itemView);

      this.bounds.extend(place.geometry.location);
    }
  },

  addMarker: function (place, map, itemView) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });

    this.markers[place.place_id] = marker;

    var placeName = $("<strong>").text(place.name);
    var address = $("<p>").text(this.parseAddress(place));
    var placeInfo = $("<i>").append(placeName).append(address);

    var itemInfo = this.parseItemInfo(itemView);

    var info = $("<div>").append(itemInfo).append(placeInfo);

    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(info[0]);

    this.infoWindows[place.place_id] = infoWindow;

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(info[0]);
      infoWindow.open(map, this);
    });
  },

  parseItemInfo: function (itemView) {
    if (itemView.model.escape("owner_id")) {
      var albumUrl = $("<a>").attr("href", '#users/' + itemView.model.escape('owner_id') + '/albums/' + itemView.model.id);
      var albumName = $("<h4>").text(itemView.model.escape("title"));
      var photo = this.getPhotoUrlOrError(itemView);
      return albumUrl.html(albumName).append(photo);
    } else {
      var photoCaption = $("<h4>").text(itemView.model.escape("caption"));
      var photo = this.getPhotoUrlOrError(itemView);
      return $("<div>").append(photo).append(photoCaption);
    }
  },

  getPhotoUrlOrError: function (itemView) {
    if (itemView.getThumbnail()) {
      return $("<p>").html($("<img>").attr({'src': itemView.getThumbnail(), 'width': '75px', 'height': '75px'}));
    } else {
      return $("<p>").text("No Photos Yet");
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
  },

  zoomOrResize: function () {
    this._map.fitBounds(this.bounds);
    if (Object.keys(this.markers).length <= 1) {
      this._map.setZoom(15);
    }
  }
});
