Instacation.Views.AlbumItem = Backbone.View.extend({

  template: JST['albums/album_item'],

  initialize: function (options) {
    this.editable = options.editable;
  },

  tagName: 'div class="album-item col-sm-6 col-md-4 col-lg-2"',

  events: {
    'click .delete-album':'destroy',
  },

  render: function(){
    var content = this.template({album: this.model, photo: this.model.photos().first(), editable: this.editable});
    this.$el.html(content);
    return this;
  },

  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
});
