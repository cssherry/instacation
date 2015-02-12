Instacation.Views.LocationItem = Backbone.View.extend({

  template: JST['locations/location_item'],

  initialize: function (options) {
    this.locationName = options.locationName;
    this.location = options.location;
    this.tag = options.tag;
  },

  tagName: 'option',

  render: function(){
    var content = this.template({location: this.locationName});
    this.$el.html(content);
    this.$el.val(this.location);
    this.$el.addClass(this.tag);
    return this;
  },
});
