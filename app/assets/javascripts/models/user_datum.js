Instacation.Models.UserDatum = Backbone.Model.extend({
  urlRoot: 'api/user_data',

  parse: function (jsonObject) {
    if (jsonObject.albums) {
      this.albums().set(jsonObject.albums);
      delete(jsonObject.albums);
    }
    return jsonObject;
  },

  albums: function () {
    if (!this._albums) {
      this._albums = new Instacation.Collections.Albums();
    }
    return this._albums.sort();
  },
});
