Instacation.Routers.UserData = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'currentUserShow',
    'users/:id': 'userDataShow',
    'users/:userId/albums/:albumId': 'albumShow',
    'users/:userId/albums/:albumId/photos/:photoId': 'photoShow'
  },

  currentUserShow: function () {
    this.userDataShow(Instacation.currentUserId);
  },

  userDataShow: function (id) {
    var user = new Instacation.Models.UserDatum({id: id});
    var editable = id === Instacation.currentUserId;
    user.fetch({
      success: function () {
        var userShowView = new Instacation.Views.UserDataShow({model: user, editable: editable});
        this._swapview(userShowView);
      }.bind(this)
    });
  },

  albumShow: function (userId, albumId) {
    var album = new Instacation.Models.Album({id: albumId});
    album.fetch({
      success: function () {
        var albumShowView = new Instacation.Views.AlbumShow({model: album});
        this._swapview(albumShowView);
      }.bind(this)
    });
  },

  photoShow: function (userId, albumId, photoId) {
    var photo = new Instacation.Models.Photo({id: photoId});
    photo.fetch({
      success: function () {
        var photoShowView = new Instacation.Views.PhotoShow({model: photo, userId: userId});
        this._swapview(photoShowView);
      }.bind(this)
    });
  },

  _swapview: function (newView) {
    this._oldview && this._oldview.remove();
    this._oldview = newView;
    this.$rootEl.html(newView.render().$el);
  }
});
