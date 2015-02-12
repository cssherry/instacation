Instacation.Routers.UserData = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'currentUserShow',
    'users/:id': 'userDataShow',
    'users/:userId/albums/:albumId': 'albumShow',
  },

  events: {
    "click .navigate-back": "navigateBack",
  },

  currentUserShow: function () {
    this.userDataShow(Instacation.currentUserId);
  },

  userDataShow: function (id) {
    var user = new Instacation.Models.UserDatum({id: id});
    var editable = parseInt(id) === Instacation.currentUserId;
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

  _swapview: function (newView) {
    this._oldview && this._oldview.remove();
    this._oldview = newView;
    // put element on page before rendering!
    this.$rootEl.html(newView.$el);
    newView.render();
    Instacation.resize();
  },

  navigateBack: function () {
    window.history.back();
  }


});
