Instacation.Collections.Photos = Backbone.Collection.extend({

  model: Instacation.Models.Photo,

  url: 'api/photos',

  comparator: function (photo) {
    return [new Date(Date.now()) - new Date(photo.get('updated_at')), -photo.get('order')];
  },

  fetchOrGet: function (id) {
    var photo = this.get(id);
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
