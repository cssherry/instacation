Instacation.Views.MapItem = Backbone.View.extend({
  template: JST['maps/map_item'],

  initialize: function (options) {
    this.markers = {};
    this.infoWindows = {};
    this.map(options.mapElement);
    this.$el = options.mapElement;
    this.bounds = new google.maps.LatLngBounds();
    this.locations = {};

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
    var index = 0;

    this.collection.forEach(function(itemView ){
      var locationId = that.getLocationId(itemView);
      if (locationId) {
        if (that.locations[locationId]) {
          that.locations[locationId].push(itemView);
        } else {
          that.locations[locationId] = [itemView];
        }
        numberItemWithLocations ++;
      }
    });

    if (numberItemWithLocations === 0) {
      $(this.$el).addClass("hidden");
    } else {
      this.queryGoogle(map);
    }
  },

  getLocationId: function (itemView) {
    if (itemView.model.escape("owner_id")) {
      return itemView.model.escape('location_id');
    } else {
      return itemView.getLocationId();
    }
  },

  queryGoogle: function (map) {
    var that = this;
    var placeIds = Object.keys(this.locations);
    placeIds.forEach(function(placeId){
      var itemsWithPlaceId = that.locations[placeId];
      var service = new google.maps.places.PlacesService(map);
      service.getDetails({placeId: placeId}, function (result, status) {
        that.renderLocationOnMap(result, map, itemsWithPlaceId, status);
      });
    });
  },

  renderLocationOnMap: function (place, map, itemsWithPlaceId, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      itemsWithPlaceId.forEach(function(itemView){
        this.addMarker(place, map, itemView);
      }.bind(this));
      this.bounds.extend(place.geometry.location);
    }
  },

  addMarker: function (place, map, itemView) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });

    this.markers[itemView.model.id] = marker;

    var placeName = $("<strong>").text(place.name);
    var address = $("<p>").text(this.parseAddress(place));
    var placeInfo = $("<i>").append(placeName).append(address);

    var itemInfo = this.parseItemInfo(itemView);

    var info = $("<div>").addClass("center").append(itemInfo).append(placeInfo);

    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(info[0]);

    this.infoWindows[itemView.model.id] = infoWindow;
    var that = this;
    google.maps.event.addListener(marker, 'click', function() {
      that.collection[0].trigger("selectNewMarker", infoWindow);
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
      return $("<div>").append(photoCaption).append(photo);
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
    if (this.bounds.Ba.j === this.bounds.Ba.k) {
      this._map.setZoom(15);
    }
  }
});
