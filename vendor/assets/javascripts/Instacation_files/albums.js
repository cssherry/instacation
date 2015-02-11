Instacation.Collections.Albums = Backbone.Collection.extend({

  model: Instacation.Models.Album,

  url: 'api/albums',

  comparator: function (album) {
    return new Date(Date.now()) - new Date(album.escape('updated_at'));
  },

  fetchOrGet: function (id) {
    var album = this.get(id);
    if (!album) {
      album = new Instacation.Models.Album({ id: id });
      album.fetch({
        success: function () {
          this.add(album);
        }.bind(this)
      });
    } else {
      album.fetch();
    }
    return album;
  }
});
