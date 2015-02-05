Instacation.Routers.UserData = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'currentUserShow',
    'users/:id': 'userDataShow',
    'users/:userId/albums/:albumId': 'albumShow',
    'albums/:albumId/photos/:photoId': 'photoShow'
  },

  currentUserShow: function () {
    this.userDataShow(Instacation.currentUserId);
  },

  userDataShow: function (id) {
    var user = new Instacation.Models.UserDatum({id: id});
    var editable = id === Instacation.currentUserId;
    var userShowView = new Instacation.Views.UserDataShow({model: user, editable: editable});
    this._swapview(userShowView);
  },

  albumShow: function (userId, albumShow) {
    var album = new Instacation.Models.Album({id: id});
    var editable = userId === Instacation.currentUserId;
    var albumShowView = new Instacation.Views.AlbumShow({model: album, editable: editable});
    this._swapview(albumShowView);
  },

  _swapview: function (newView) {
    this._oldview && this._oldview.remove();
    this._oldview = newView;
    this.$rootEl.html(newView.render().$el);
  }
});
