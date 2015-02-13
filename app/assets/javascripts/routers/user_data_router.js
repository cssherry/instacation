Instacation.Routers.UserData = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'currentUserShow',
    'users/:id': 'userDataShow',
    'users/:userId/albums/:albumId': 'albumShow',
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
    Instacation.setThumbnailSize();
    Instacation.resize();
    Instacation.changeHeightForFooter();
  },

  navigateBack: function () {
    window.history.back();
  },

  createAlbumForm: function (event) {
    event.preventDefault();
    $target = $(event.target);

    if ($target.attr("class") === "open-album-form") {
      var albumForm = new Instacation.Views.AlbumForm({userView: this._oldview});
      this._oldview.addSubviewFront(".album-form", albumForm);

      $target.toggleClass('open-album-form close-form');
    }
  },

  closeAlbumForm: function ($target) {
    var view = this._oldview.subviews('.album-form')[0];
    this._oldview.removeSubview(".album-form", view);
    $target$('.close-form').html('New Album');
    t$target$('.close-form').toggleClass('open-album-form close-form');
  },


});
