(function(namespace) {

  var models = namespace.models;
  var collections = namespace.collections;
  var views = namespace.views;

  var getTemplate = function(name) {
    return hbs.compile($('#root-' + name + '-template').html());
  }

  views.Main = Bb.View.extend({
    template: getTemplate('main'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.html(me.template());
      this.tests();
      return me;
    },
    tests: function() {
      var me = this;
      /*window.tests.add('citiesTest', function() {
        var data = {
          method: 'get',
          resource: uri('countries'),
          params: null
        };
        window.tests.call(data);
      });*/
      window.tests.evaluate(me.$('#results'));
    }
  });

})(root);