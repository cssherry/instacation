Instacation.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],

  initialize: function (options) {
    this.model.fetch({
      success: function () {
        this.render();
      }.bind(this)
    });

    this.userId = options.userId;
  },

  render: function(){
    var content = this.template({photo: this.model,  userId: this.userId});
    this.$el.html(content);
    return this;
  },
});
