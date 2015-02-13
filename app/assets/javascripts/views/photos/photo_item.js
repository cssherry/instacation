Instacation.Views.PhotoItem = Backbone.CompositeView.extend({

  template: JST['photos/photo_item'],

  initialize: function (options) {
    this.editable = options.editable;
    this.userId = options.userId;
    this.albumView = options.albumView;
    this.album = options.albumView.model;
    this.addPhotoEditForm();
  },

  tagName: 'div class="photo-item"',

  events: {
    'click .delete-photo':'destroy',
    'mouseover .image': 'triggerMarker',
    'mouseout .image': 'closeMarker',

  },

  render: function(){
    var modelPhotoUrl = this.getThumbnail();
    var content = this.template({photo: this.model,
                                 editable: this.editable,
                                 photoUrl: modelPhotoUrl,
                                 userId: this.userId});
    this.$el.html(content);


    if (this.getLocationHash()) this.$(".location-name").prepend(this.parseLocation(this.getLocationHash()));

    return this;
  },

  getThumbnail: function () {
    return $.cloudinary.image(this.model.get('cloudinary_id'), { width: 300, height: 300, crop: 'fill'})[0].src;
  },

  getLocationHash: function () {
    var placeID = this.model.escape('location_id');
    var albumPlaceID = this.album.escape('location_id');
    if (placeID) {
      return {"Photo Location": this.model.locations().first()};
    } else if (albumPlaceID) {
      return {"Album Location": this.album.locations().first()};
    }
  },

  parseLocation: function (typeLocationHash) {
    var locationString = Object.keys(typeLocationHash)[0];
    var location = typeLocationHash[locationString];
    $locationName = $("<b>").text(locationString + ": ").append($("<br>")).append(location.escape('name'));
    $locationDescription = $("<i>").text(" (" + location.escape('state') + ", " + location.escape('country') + ")");
    return ($locationName).add($locationDescription);
  },

  getLocationId: function () {
    var locationHash = this.getLocationHash();
    if (locationHash) {
      var location = Object.keys(locationHash)[0];
      return locationHash[location].escape("place_id");
    }
  },

  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  addPhotoEditForm: function (event) {
    var user = new Instacation.Models.UserDatum({id: this.userId});
    user.fetch({
      success: function () {
        var photoForm = new Instacation.Views.PhotoForm({photoView: this, id: "photoFormEdit" + this.model.id, albums: user.albums()});
        this.addSubviewFront(".edit-photo-form", photoForm);
      }.bind(this)
    });
  },

  triggerMarker: function () {
    if (this.getLocationId()) {
      this.model.trigger('selectImage', this.model.id);
    }
  },

  closeMarker: function () {
    if (this.getLocationId()) {
      this.model.trigger('unselectImage', this.model.id);
    }
  },
});
