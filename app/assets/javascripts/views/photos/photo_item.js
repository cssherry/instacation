Instacation.Views.PhotoItem = Backbone.View.extend({

  template: JST['photos/photo_item'],

  initialize: function (options) {
    this.editable = options.editable;
  },

  tagName: 'div class="photo-item"',

  events: {
    'click .delete-photo':'destroy',
  },

  render: function(){
    var content = this.template({photo: this.model, editable: this.editable});
    this.$el.html(content);
    return this;
  },

  destroy: function (event) {
    this.model.destroy();
  },
});
