/*global require, jasmine*/

require.config({
  map: {
    '*': {
      'style': '../style',
      'log': 'lib/log'
    }
  }
});

require([
  // Tests
  'test',

  // RequireJS Plugins
  'lib/domReady!'
], function () {
  var jasmineEnv = jasmine.getEnv();
  var reporter = new jasmine.TrivialReporter();

  jasmineEnv.addReporter(reporter);
  jasmineEnv.specFilter = function (spec) {
    return reporter.specFilter(spec);
  };

  jasmineEnv.execute();
});

