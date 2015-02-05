Backbone.CompositeView = Backbone.View.extend({

  addSubviewEnd: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubviewEnd(selector, subview.render());
  },

  addSubviewFront: function (selector, subview) {
    this.subviews(selector).unshift(subview);
    this.attachSubviewFront(selector, subview.render());
  },

  attachSubviewFront: function (selector, subview) {
    this.$(selector).prepend(subview.$el);
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviewEnd: function (selector, subview) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviews: function () {
    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubviewEnd(selector, subview);
      });
    });
  },

  onRender: function () {
    _(this.subviews()).each(function (subviews, selector) {
      _(subviews).each(function (subview) {
        if (subview.onRender) {
          subview.onRender();
        }
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
