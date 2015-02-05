window.Instacation = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    // useless, just style in css
    // this.resizePhoto = function (url, maxHeight) {
    //   var newImage = new Image;
    //   newImage.src = url
    //   newImage.onload = function () {
    //     var ratio = maxHeight / newImage.height
    //     var height = newImage.height
    //     var width = newImage.width
    // 
    //     newImage.width = ratio * width
    //     newImage.height = ratio * height
    //   }
    //   return newImage
    // };
    var $root = $('#main');
    this.currentUserId = $root.data('current-user');
    new Instacation.Routers.UserData({$rootEl: $root});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Instacation.initialize();
});
