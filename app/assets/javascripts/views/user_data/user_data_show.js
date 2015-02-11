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
    this.listenTo(this.model.albums(), 'selectImage', this.highlightMarker.bind(this));
    this.listenTo(this.model.albums(), 'unselectImage', this.unhighlightMarker.bind(this));
  },

  events: {
    'click .open-album-form': 'createAlbumForm',
    'click .close-form': 'closeAlbumForm',
  },

  render: function(){
    var content = this.template({user: this.model, editable: this.editable});
    this.$el.html(content);
    this.attachSubviews();
    var mapElement = this.$('.google-map-collection')[0];
    this.addMapItem(mapElement, this.addSubviewEnd);
    return this;
  },

  addAlbumItems: function (albumItem, fn) {
    var albumView = new Instacation.Views.AlbumItem({model: albumItem, editable: this.editable});
    fn.call(this, ".albums", albumView);
  },

  addMapItem: function (mapElement, fn) {
    this.mapView = new Instacation.Views.MapItem({collection: this.subviews('.albums'), mapElement: mapElement});
    fn.call(this, ".google-map-collection", this.mapView);
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

  highlightMarker: function (event) {
    var place_id = event.escape("location_id");
    var marker = this.mapView.markers[place_id];
    if (marker) {
      var map = this.mapView.map();
      map.setCenter(marker.location);
      // map.setZoom(15);

      marker.setAnimation(google.maps.Animation.BOUNCE);

      if(this.openMarker) this.openMarker.close();
      this.openMarker = this.mapView.infoWindows[place_id];
      this.openMarker.open(map, marker);
    }
  },

  unhighlightMarker: function (event) {
    var place_id = event.escape("location_id");
    var marker = this.mapView.markers[place_id];
    if (marker) marker.setAnimation(null);
  }
});
