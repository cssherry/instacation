Instacation.Views.PhotoItem = Backbone.View.extend({

  template: JST['photos/photo_item'],

  initialize: function (options) {
    this.editable = options.editable;
    this.userId = options.userId;
  },

  tagName: 'div class="photo-item col-sm-6 col-md-4 col-lg-2"',

  events: {
    'click .delete-photo':'destroy',
    'click .edit-photo': 'editItem',
    'click .close-photo-form': 'closeEditPhoto',
  },

  render: function(){
    var content = this.template({photo: this.model, editable: this.editable, userId: this.userId});
    this.$el.html(content);
    return this;
  },

  destroy: function (event) {
    event.preventDefault();
    this.model.destroy();
  },

  editPhoto: function (event) {
    event.preventDefault();
    var photoForm = new Instacation.Views.PhotoForm({photoView: this});
    this.addSubviewFront(".edit-photo-form", photoForm);
    this.$('.edit-photo').html('close form');
    this.$('.edit-photo').toggleClass('edit-photo close-photo-form');
  },

  hidePhotoForm: function () {
    var view = this.subviews('.edit-photo-form')[0];
    this.removeSubview(".edit-photo-form", view);
    this.$('.close-photo-form').html('edit');
    this.$('.close-photo-form').toggleClass('edit-photo close-photo-form');
  },

  closeEditPhoto: function (event) {
    event.preventDefault();
    this.hidePhotoForm();
  },
});
