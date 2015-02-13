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
    Instacation.resize();
    return this;
  },

  map: function (mapElement){
    if (!this._map && mapElement) {
      this._map = new google.maps.Map(mapElement);
      style = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
      this._map.setOptions({styles: style});
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

    var info = $("<div id='infobox'>").addClass("center").append(itemInfo).append(placeInfo);

    var options = {content: info[0],
                  disableAutoPan: false,
                  zIndex: null,
                  boxStyle: {background: "'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif' no-repeat",
                            opacity: 0.75},
                  closeBoxMargin: "12px 4px 2px 2px",
                  closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                  infoBoxClearance: new google.maps.Size(1, 1)};
    var infoWindow = new InfoBox(options);

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
      var title = $("<h4 class='fitable-text'>").text(itemView.model.escape("title"));
      var albumName = $("<div class='fit-container'>").html(title);
      var photo = this.getPhotoUrlOrError(itemView);
      return albumUrl.html(albumName).append(photo);
    } else {
      var caption = $("<h4 class='fitable-text'>").text(itemView.model.escape("caption"));
      var photoCaption = $("<div class='fit-container'>").html(caption);
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
