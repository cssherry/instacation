Instacation.Views.AlbumShow = Backbone.CompositeView.extend({
  template: JST['albums/show'],

  initialize: function (options) {
    this.userId = this.model.escape('owner_id');
    this.editable = this.userId == Instacation.currentUserId;
    this.model.photos().each( function (photoItem) {
      this.addPhotoItems(photoItem, this.addSubviewEnd);
    }.bind(this));
    this.render();


    this.listenTo(this.model.photos(), 'add', this.render);
    this.listenTo(this.model.photos(), 'remove', this.removePhotoItem);
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
        map = this.container.find('.google-map')[0];

    if (photo.escape('location_id')) {
      $(map).removeClass("hidden");
      albumView.renderMap.call(albumView, map, photo);
    } else {
      $(map).addClass("hidden");
    }
  },

  renderMap: function (mapElement, photo) {
    var map = new google.maps.Map(mapElement);
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({placeId: photo.escape('location_id')}, function (result, status) {
                                                            this.renderLocationOnMap(result, status, map);
                                                          }.bind(this));
  },

  renderLocationOnMap: function (results, status, map) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      var place = results;

      this.addMarker(place, map);

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(15);
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


  addPhotoItems: function (photoItem, fn) {
    var photoView = new Instacation.Views.PhotoItem({model: photoItem, editable: this.editable, userId: this.userId});
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
});
