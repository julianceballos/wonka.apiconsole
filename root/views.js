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
      'click .api-method': 'onChangeMethod',
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
      new views.Options({
        el: me.$('#options'),
        model: {},
        parentView: me
      });
      return me;
    },
    onChangeMethod: function(e) {
      var me = this;
      var target = me.$(e.currentTarget);
      var endpoints = App.pkg.settings.endpoints;
      var endpoint = {};
      for(var i in endpoints) {
        if (target.data('option') == endpoints[i].id) {
          endpoint = endpoints[i];
        }
      }
      endpoint.base_url = App.pkg.settings.api;
      endpoint.params = JSON.stringify(endpoint.params, null, 2);
      new views.Options({
        el: me.$('#options'),
        model: endpoint,
        parentView: me
      });
      me.$('#verb').val(endpoint.method);
      me.$('#resource').focus();
    },
    onLoadEndpoint: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var me = this;
      me.$('#results').html('');
      var form = formToJSON(me.$('form'));
      form.params = me.editor.getValue().replace(/\n/gi, '').replace(/ /gi, '');
      try {
        form.params = form.params == '' ? {} : eval('(' + form.params + ')');
      } catch(e) {
        alert(__('There is an syntax error, please check you json object.'));
        return false;
      }
      window.tests.evaluations = {};
      window.tests.add(form.verb + '-' + form.url, function() {
        var data = {
          method: form.verb,
          resource: form.url,
          params: form.params
        };
        window.tests.call(data);
      });
      window.tests.evaluate(me.$('#results'));
    }
  });

  views.Options = Bb.View.extend({
    template: getTemplate('options'),
    initialize: function() {
      var me = this;
      me.render();
    },
    render: function() {
      var me = this;
      me.$el.html(me.template(me.model));
      me.options.parentView.editor = CodeMirror.fromTextArea(me.$('textarea')[0], {
        matchBrackets: true,
        styleActiveLine: true,
        smartIndent: false,
        tabSize: 2,
        mode: "javascript",
        json: true,
        autoCloseBrackets: true,
        placeholder: 'Params here as JSON...'
      });
      return me;
    }
  });

})(root);