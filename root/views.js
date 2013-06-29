(function(namespace) {

  var models = namespace.models;
  var collections = namespace.collections;
  var views = namespace.views;

  var getTemplate = function(name) {
    return hbs.compile($('#root-' + name + '-template').html());
  }

  views.Main = Bb.View.extend({
    template: getTemplate('main'),
    events: {
      'click #add-param-button': 'onAddParam',
      'submit': 'onLoadEndpoint'
    },
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.html(me.template({
        'base_url': App.pkg.settings.api,
        'endpoints': App.pkg.settings.endpoints
      }));
      me.editor = CodeMirror.fromTextArea(me.$('textarea')[0], {
        matchBrackets: true,
        styleActiveLine: true,
        smartIndent: false,
        tabSize: 2,
        mode: "javascript",
        json: true,
        value: "\{\n\}",
        autoCloseBrackets: true,
        placeholder: 'Params here as JSON...'
      });
      return me;
    },
    onAddParam: function(e) {
      var me = this;
      var paramView = new views.Param();
      me.$('#params').append(paramView.render().$el);
    },
    onLoadEndpoint: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var me = this;
      me.$('#results').html('');
      var form = formToJSON(me.$('form'));
      form.params = me.editor.getValue().replace(/\n/gi, '').replace(/ /gi, '');
      try {
        form.params = eval('(' + form.params + ')');
      } catch(e) {
        alert(__('There is an syntax error, please check you json object.'));
        return false;
      }
      window.tests.evaluations = {};
      var endpoint = uri(form.endpoint) + (form.id != '' ? ('/' + form.id) : '');
      window.tests.add(form.verb + '-' + form.endpoint, function() {
        var data = {
          method: form.verb,
          resource: endpoint,
          params: form.params
        };
        window.tests.call(data);
      });
      window.tests.evaluate(me.$('#results'));
    }
  });

views.Param = Bb.View.extend({
  template: getTemplate('param'),
  render: function() {
    var me = this;
    me.$el.html(me.template());
    return me;
  }
})

})(root);