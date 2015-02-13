Instacation.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST['albums/show'],

  className: "main",

  initialize: function (options) {
    this.userId = this.model.escape('owner_id');
    this.editable = this.userId == Instacation.currentUserId;
    this.model.photos().each( function (photoItem) {
      this.addPhotoItems(photoItem, this.addSubviewEnd);
    }.bind(this));

    this.addAlbumForm();

    // DON'T DO THIS! GOOGLE Maps won't load properly
    // this.render();

    this.listenTo(this.model.photos(), 'add', this.render);
    this.listenTo(this.model.photos(), 'remove', this.removePhotoItem);

    this.listenTo(this.model.photos(), 'selectImage', this.highlightMarker.bind(this));
    this.listenTo(this.model.photos(), 'unselectImage', this.unhighlightMarker.bind(this));
  },

  events: {
    'click .open-photo-form': 'createPhotoForm',
    'click .close-form': 'closePhotoForm',
    'sortstop .photos': 'reorderPhotos',
    'click .link': "openGallery"
  },

  render: function(){
    var content = this.template({album: this.model, editable: this.editable, userId: this.userId});
    this.$el.html(content);
    this.attachSubviews();
    this.$('.photos').sortable();
    var mapElement = this.$('.google-map-collection')[0];
    this.addMapItem(mapElement, this.addSubviewEnd);
    return this;
  },

  openGallery: function (event) {
    event = event || window.event;
    var  that = this;
    var target = event.target || event.srcElement,
        link = target.src ? target.parentNode : target,
        options = {index: link,
                   event: event,
                   stretchImages: true,
                   onslide: function (index, slide) {
                     that.displayDescription.call(this, index, slide, that);
                   }},
        links = this.$('.link');
    blueimp.Gallery(links, options);
  },

  displayDescription: function (index, slide, albumView) {
    var text = this.list[index].getAttribute('data-description'),
        node = this.container.find('.description');
    node.empty();

    if (text) {
      node[0].appendChild(document.createTextNode(text));
    }

    var photoId = $(this.list[index]).attr('id'),
        photo = albumView.model.photos().get(photoId),
        albumLocation = albumView.model.escape("location_id"),
        map = this.container.find('.google-map')[0];

    if (photo.escape('location_id')) {
      $(map).removeClass("hidden");
      albumView.renderMap.call(albumView, map, photo);
    } else if (albumLocation) {
      $(map).removeClass("hidden");
      albumView.renderMap.call(albumView, map, albumView.model);
    } else {
      $(map).addClass("hidden");
    }
  },

  renderMap: function (mapElement, item) {
    var map = new google.maps.Map(mapElement);
    style = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2e5d4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]}]
    map.setOptions({styles: style});
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({placeId: item.escape('location_id')}, function (result, status) {
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
      var content = '<div id="infobox"><p><strong>' + place.name + '</strong><br>' + this.parseAddress(place) + "</p></div>";
      var options = {content: content,
                    disableAutoPan: false,
                    maxWidth: 150,
                    zIndex: null,
                    boxStyle: {background: "'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif' no-repeat",
                              opacity: 0.75},
                    closeBoxMargin: "12px 4px 2px 2px",
                    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                    infoBoxClearance: new google.maps.Size(1, 1)};
      var infoWindow = new InfoBox(options);
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
  },

  addAlbumForm: function () {
    var albumForm = new Instacation.Views.AlbumForm({userView: this, id: "albumFormNew"});
    this.addSubviewEnd(".album-form", albumForm);
  },

  addMapItem: function (mapElement, fn) {
    this.mapView = new Instacation.Views.MapItem({collection: this.subviews('.photos'), mapElement: mapElement});
    if (this.subviews('.photos')[0]) this.listenTo(this.subviews('.photos')[0], 'selectNewMarker', this.closeMarker.bind(this));
    fn.call(this, ".google-map-collection", this.mapView);
  },

  addPhotoItems: function (photoItem, fn) {
    var photoView = new Instacation.Views.PhotoItem({model: photoItem, editable: this.editable, userId: this.userId, album: this.model});
    fn.call(this, ".photos", photoView);
  },

  removePhotoItem: function (photo) {
    var view = _(this.subviews('.photos')).findWhere({ model: photo });
    this.removeSubview(".photos", view);
    this.render();
  },

  createPhotoForm: function (event) {
    event.preventDefault();
    var photoForm = new Instacation.Views.PhotoForm({albumView: this});
    this.addSubviewFront(".photo-form", photoForm);
    this.$('.open-photo-form').html('Close form');
    this.$('.open-photo-form').toggleClass('open-photo-form close-form');
  },

  closePhotoForm: function (event) {
    event.preventDefault();
    this.hidePhotoForm();
  },

  hidePhotoForm: function () {
    var view = this.subviews('.photo-form')[0];
    this.removeSubview(".photo-form", view);
    this.$('.close-form').html('+ New Photo');
    this.$('.close-form').toggleClass('open-photo-form close-form');
  },

  reorderPhotos: function (event) {
    var photos = $(event.target).find('.photo-item');
    photos.each(function (indx, photo) {
      var currentId = $(photo).find('.caption').attr('id');
      var currentPhoto = this.model.photos().get(currentId);
      currentPhoto.save({order: indx});
    }.bind(this));
  },

  highlightMarker: function (modelId) {
    var marker = this.mapView.markers[modelId];
    if (marker) {
      var map = this.mapView.map();
      map.setCenter(marker.location);

      marker.setAnimation(google.maps.Animation.BOUNCE);

      if(this.openMarker) this.openMarker.close();
      this.openMarker = this.mapView.infoWindows[modelId];
      this.openMarker.open(map, marker);
      Instacation.resize();
    }
  },

  unhighlightMarker: function (modelId) {
    Instacation.resize();
    var marker = this.mapView.markers[modelId];
    if (marker) marker.setAnimation(null);
  },

  closeMarker: function(infoWindow){
    if(this.openMarker) this.openMarker.close();
    this.openMarker = infoWindow;
    Instacation.resize();
  }
});
