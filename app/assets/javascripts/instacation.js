window.Instacation = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $root = $('#main');
    this.currentUserId = $root.data('current-user');
    new Instacation.Routers.UserData({$rootEl: $root});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Instacation.initialize();
});
