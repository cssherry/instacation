Instacation.Collections.Photos = Backbone.Collection.extend({

  model: Instacation.Models.Photo,

  url: 'api/photos',

  comparator: function (photo) {
    return [photo.escape('order'), new Date(Date.now()) - new Date(photo.escape('updated_at'))];
  },

  fetchOrGet: function (id) {
    var photo = this.escape(id);
    if (!photo) {
      photo = new Instacation.Models.Photo({ id: id });
      photo.fetch({
        success: function () {
          this.add(photo);
        }.bind(this)
      });
    } else {
      photo.fetch();
    }
    return photo;
  }
});
