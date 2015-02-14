Instacation.Models.Photo = Backbone.Model.extend({
  urlRoot: 'api/photos',

  parse: function (jsonObject) {
    return this.setLocation(jsonObject);
  },

  initialize: function (object) {
    this.setLocation(object);
  },

  setLocation: function (object) {
    if (object && object.location) {
      this.locations().set(object.location);
      delete(object.location);
    }
    if (object && object.location) {
      this.locations().set(object.location);
      delete(object.location);
    }
    return object;
  },

  locations: function () {
    if (!this._locations) {
      this._locations = new Instacation.Collections.Locations();
    }
    return this._locations;
  },

  getThumbnail: function () {
    var thumbnail =  $.cloudinary.image(this.get('cloudinary_id'), { width: 300, height: 300, crop: 'fill'})[0].src;
    var scaledImage = $.cloudinary.image(this.get('cloudinary_id'), { width: 600, height: 600, crop: 'limit'})[0].src;
    return {thumbnail: thumbnail, scaledImage: scaledImage};
  },
});
