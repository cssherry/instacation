Instacation.Views.UserDataShow = Backbone.CompositeView.extend({
  template: JST['user_data/show'],

  className: "main",

  initialize: function (options) {
    this.editable = options.editable;

    this.locations = {};
    this.locationAndAlbums = {};
    this.searchFields = [];

    this.model.albums().each( function (albumItem) {
      this.addAlbumItems(albumItem, this.addSubviewEnd);
    }.bind(this));

    this.addAlbumForm();
    this.addPhotoForm();

    this.addLocationItems();

    this.listenTo(this.model.albums(), 'add', this.render);
    this.listenTo(this.model.albums(), 'remove', this.removeAlbumItem);

    this.listenTo(this.model.albums(), 'selectImage', this.highlightMarker.bind(this));
    this.listenTo(this.model.albums(), 'unselectImage', this.unhighlightMarker.bind(this));
  },

  events: {
    'select2:select .multiple-location-selector': 'searchCollection',
    'select2:unselect .multiple-location-selector': 'unSearchCollection',
  },

  render: function(){
    var content = this.template({user: this.model, editable: this.editable});
    this.$el.html(content);

    var index = Math.round(Math.random() * (this.model.albums().length - 1));
    if (this.model.albums().length !== 0) var albumPhotoUrl = this.model.albums().models[index].getThumbnail()["thumbnail"];
    if (albumPhotoUrl) {
        this.$(".bg_blur").css("background-image", "url("+ albumPhotoUrl+ ")");
        this.$(".bg_blur").css("background-size", "100%");
        this.$(".bg_blur").css("background-repeat", "no-repeat");    }
    else {
      this.$(".bg_blur").css("background-color", '#acbcc9');
    }

    this.attachSubviews();
    var mapElement = this.$('.google-map-collection')[0];
    this.addMapItem(mapElement, this.addSubviewEnd);
    $('.multiple-location-selector').select2({placeholder: "Search by location",
                                              width: '50%'});
    Instacation.setThumbnailSize();
    return this;
  },

  addAlbumItems: function (albumItem, fn, modalEl) {
    var albumView = new Instacation.Views.AlbumItem({model: albumItem, editable: this.editable});
    var location = albumItem.locations().models[0];
    if (location) {
      this.addLocationsToHash(location);
    }

    fn.call(this, ".albums", albumView);

    if (modalEl) modalEl.addClass("hidden");
    if (modalEl) modalEl.modal("toggle");
    if (modalEl) modalEl.modal("hide");
    Instacation.setThumbnailSize();
  },

  addAlbumForm: function () {
    var albumForm = new Instacation.Views.AlbumForm({userView: this, id: "albumFormNew"});
    this.addSubviewEnd(".album-form", albumForm);
  },

  addPhotoForm: function () {
    var photoForm = new Instacation.Views.PhotoForm({albumView: this, id: "photoFormNew", albums: this.model.albums()});
    this.addSubviewFront(".photo-form", photoForm);
  },

  addLocationsToHash: function (location) {
    var locationCountry = location.escape("country"),
        locationState = location.escape("state"),
        locationCity = location.escape("city");

    if (!this.locations[locationCountry]) {
      this.locations[locationCountry] = {};
    }

    if (!this.locations[locationCountry][locationState]) {
      this.locations[locationCountry][locationState] = {};
    }

    if (!this.locations[locationCountry][locationState][locationCity]) {
      this.locations[locationCountry][locationState][locationCity] = {};
    }
  },

  addLocationItems: function () {
    var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
    var countries = Object.keys(this.locations);
    this.addLocationItemViews("Albums without location", "no-location", "no-location");
    countries.sort().forEach(function(country){
      if (country !== "") this.addLocationItemViews(country, country.split(" ").join("-"), "country");

      var states = Object.keys(this.locations[country]);
      if (states) states.sort().forEach(function (state) {
        if (state !== "") this.addLocationItemViews(tab + state, state.split(" ").join("-"), "state");

        var cities = Object.keys(this.locations[country][state]);
        if (cities) cities.sort().forEach(function (city) {
          if (city !== "") this.addLocationItemViews(tab + tab + city, city.split(" ").join("-"), "city");
        }.bind(this));
      }.bind(this));
    }.bind(this));
  },

  addLocationItemViews: function (locationName, location, tag) {
    var locationView = new Instacation.Views.LocationItem({locationName: locationName, location: location, tag: tag});
    this.addSubviewEnd(".multiple-location-selector", locationView);
  },

  searchCollection: function (event) {
    var location = event.params.data.id;
    this.searchFields.push(location);
    $(".albums .album-item").addClass("hidden");
    this.searchFields.forEach(function(loc){
      $(".albums .album-item."+ loc).removeClass("hidden");
    });
  },

  unSearchCollection: function (event) {
    var location = event.params.data.id;
    var index = this.searchFields.indexOf(location);
    this.searchFields.splice(index, 1);
    if (this.searchFields.length === 0) {
      $(".albums .album-item").removeClass("hidden");
    } else {
      $(".albums .album-item."+ location).addClass("hidden");
    }
  },

  addMapItem: function (mapElement, fn) {
    this.mapView = new Instacation.Views.MapItem({collection: this.subviews('.albums'), mapElement: mapElement});
    if (this.subviews('.albums')[0]) this.listenTo(this.subviews('.albums')[0], 'selectNewMarker', this.closeMarker.bind(this));
    fn.call(this, ".google-map-collection", this.mapView);
  },

  removeAlbumItem: function (album) {
    var view = _(this.subviews('.albums')).findWhere({ model: album });
    this.removeSubview(".albums", view);
    this.render();
  },

  highlightMarker: function (model) {
    var marker = this.mapView.markers[model.id];
    if (marker) {
      var map = this.mapView.map();
      map.setCenter(marker.location);
      // map.setZoom(15);

      marker.setAnimation(google.maps.Animation.BOUNCE);

      if(this.openMarker) this.openMarker.close();
      this.openMarker = this.mapView.infoWindows[model.id];
      this.openMarker.open(map, marker);
      Instacation.resize();
    }
  },

  unhighlightMarker: function (model) {
    Instacation.resize();
    var marker = this.mapView.markers[model.id];
    if (marker) marker.setAnimation(null);
  },

  closeMarker: function(infoWindow){
    if(this.openMarker) this.openMarker.close();
    this.openMarker = infoWindow;
    Instacation.resize();
  }
});
