Instacation.Views.AlbumForm = Backbone.View.extend({

  template: JST['albums/album_form'],

  tagName: 'div="album-create"',

  initialize: function (options) {
    this.userView = options.userView;
  },

  events: {
    'submit .album-create': 'createAlbum',
  },

  render: function(){
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  createAlbum: function (event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON().album;
    var album = new Instacation.Models.Album(params);
    album.save({},{
      success: function(){
        this.userView.model.albums().add(album);
        this.userView.addAlbumItems(album, this.userView.addSubviewFront);
        this.$el.empty();
      }.bind(this)
    });
  },
});
