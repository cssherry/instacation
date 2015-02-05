Instacation.Views.PhotoItem = Backbone.View.extend({

  template: JST['photos/photo_item'],

  initialize: function (options) {
    this.editable = options.editable;
  },

  tagName: 'div class="photo-item col-sm-6 col-md-4 col-lg-2"',

  events: {
    'click .delete-photo':'destroy',
    'click .edit-photo': 'editItem',
  },

  render: function(){
    var content = this.template({photo: this.model, editable: this.editable});
    this.$el.html(content);
    return this;
  },

  editItem: function () {
    var form = this.$('.caption');
  },

  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
});
