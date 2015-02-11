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
    this.addEvent(window, "resize", this.changeHeightForFooter);
    this.addEvent(window, "resize", this.resize);
    Backbone.history.start();
  },

  // Took so long! But now all tax with the class "fitable-text" will be resized
  resize: function () {
    $('.fitable-text').each(function (index, textArea) {
      while( $(textArea).height() > $($('.fit-container')[index]).height() ) {
        $(textArea).css('font-size', (parseInt($(textArea).css('font-size')) - 1) + "px" );
      }
    });
  },

  changeHeightForFooter: function () {
    var docHeight = $(window).height();
     var footerHeight = $('footer').height();
     var footerTop = $('footer').position().top + footerHeight;

     if (footerTop < docHeight) {
      $('footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');
     }
  },

  addEvent: function (elem, type, eventHandle) {
    if (elem === null || typeof(elem) == 'undefined') return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on"+type]=eventHandle;
    }
  },
};

$(document).ready(function(){
  Instacation.initialize();
});
