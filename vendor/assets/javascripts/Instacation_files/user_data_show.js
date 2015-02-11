Instacation.Views.UserDataShow = Backbone.CompositeView.extend({
  template: JST['user_data/show'],

  className: "main",

  initialize: function (options) {
    this.model.fetch({
      success: function () {
        this.model.albums().each( function (albumItem) {
          this.addAlbumItems(albumItem, this.addSubviewEnd);
        }.bind(this));
        this.render();
      }.bind(this)
    });

    this.editable = options.editable;

    this.listenTo(this.model.albums(), 'add', this.render);
    this.listenTo(this.model.albums(), 'remove', this.removeAlbumItem);
    this.listenTo(this.model.albums(), 'select', this.highlightMarker);
  },

  events: {
    'click .open-album-form': 'createAlbumForm',
    'click .close-form': 'closeAlbumForm',
  },

  render: function(){
    var content = this.template({user: this.model, editable: this.editable});
    this.$el.html(content);
    var mapElement = this.$('.google-map-collection')[0];
    this.attachSubviews();
    var map = new google.maps.Map(mapElement);
    this.renderMap(map);
    return this;
  },

  addAlbumItems: function (albumItem, fn) {
    var albumView = new Instacation.Views.AlbumItem({model: albumItem, editable: this.editable});
    fn.call(this, ".albums", albumView);
  },

  removeAlbumItem: function (album) {
    var view = _(this.subviews('.albums')).findWhere({ model: album });
    this.removeSubview(".albums", view);
    this.render();
  },

  createAlbumForm: function (event) {
    event.preventDefault();
    var albumForm = new Instacation.Views.AlbumForm({userView: this});
    this.addSubviewFront(".album-form", albumForm);
    this.$('.open-album-form').html('Close form');
    this.$('.open-album-form').toggleClass('open-album-form close-form');
  },

  closeAlbumForm: function (event) {
    event.preventDefault();
    this.hideAlbumForm();
  },

  hideAlbumForm: function () {
    var view = this.subviews('.album-form')[0];
    this.removeSubview(".album-form", view);
    this.$('.close-form').html('+ New Album');
    this.$('.close-form').toggleClass('open-album-form close-form');
  },

  renderMap: function (map) {
    var that = this;
    this.model.albums().each(function (album) {
      if (album.escape('location_id')) {
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({placeId: album.escape('location_id')}, function (result, status) {
          that.renderLocationOnMap(result, status, map);
        });
      }
    });
  },

  renderLocationOnMap: function (results, status, map) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var place = results;

      this.addMarker(place, map);

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(2);
      }
    }
  },

  addMarker: function (place, map) {
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
    });

    var placeInfo = '<div><strong>' + place.name + '</strong><br>' + this.parseAddress(place);

    var infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(placeInfo);
    infoWindow.open(map, marker);

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(placeInfo);
      infoWindow.open(map, this);
    });
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
  highlightMarker: function () {
    console.log("whatup");
  }
});
