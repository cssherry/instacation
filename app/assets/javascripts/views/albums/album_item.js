Instacation.Views.AlbumItem = Backbone.View.extend({

  template: JST['albums/album_item'],

  initialize: function (options) {
    this.editable = options.editable;
  },

  tagName: 'div class="album-item"',

  events: {
    'click .delete-album':'destroy',
  },

  render: function(){
    var content = this.template({album: this.model, editable: this.editable});
    this.$el.html(content);
    return this;
  },

  destroy: function (event) {
    this.model.destroy();
  },
});
