Instacation.Views.UserDataShow = Backbone.CompositeView.extend({
  template: JST['user_data/show'],

  initialize: function (options) {
    this.model.fetch({
      success: function () {
        this.model.albums().each( function (albumItem) {
          this.addAlbumItems(albumItem, this.addSubviewEnd);
        }.bind(this));
        this.render();
      }.bind(this)
    });

    this.editable = options.editable;

    this.listenTo(this.model.albums(), 'add', this.render);
    this.listenTo(this.model.albums(), 'remove', this.removeAlbumItem);
  },

  events: {
    'click .album-delete':'deleteAlbum',
    'click .open-album-form': 'createAlbumForm',
    'click .close-form': 'closeAlbumForm',
  },

  render: function(){
    var content = this.template({user: this.model, editable: this.editable});
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addAlbumItems: function (albumItem, fn) {
    var albumView = new Instacation.Views.AlbumItem({model: albumItem, editable: this.editable});
    fn.call(this, ".albums", albumView);
  },

  removeAlbumItem: function (album) {
    var view = _(this.subviews('.albums')).findWhere({ model: album });
    this.removeSubview(".albums", view);
    this.render();
  },

  createAlbumForm: function (event) {
    event.preventDefault();
    var albumForm = new Instacation.Views.AlbumForm({userView: this});
    this.addSubviewFront(".album-form", albumForm);
    this.$('.create-album').html('Close form');
    this.$('.create-album').toggleClass('create-album close-form');
  },

  closeAlbumForm: function (event) {
    event.preventDefault();
    this.hideAlbumForm();
  },

  hideAlbumForm: function () {
    this.$('.album-form').empty();
    this.$('.close-form').html('Add a new album');
    this.$('.close-form').toggleClass('create-album close-form');
  },
});
