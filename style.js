/*global define, requirejs, document */

define(['log!./style', 'module'], function (log, module) {
  var onResourceLoad = requirejs.onResourceLoad;
  var docHead = document.head || document.getElementsByTagName('head')[0];
  var styleLinks = {};
  var pluginPrefix = module.id;

  var extensions = module.config().extensions || {};
  var defaultExt = extensions['*'] || extensions[''] || '.css';
  log.debug('Default extension:', defaultExt, 'Extension map:', extensions);

  function findExtension (name) {
    var extension = defaultExt;
    var match = '';

    for (var path in extensions) {
      if (path.length > match.length && (name === path || name.lastIndexOf(path + '/', 0) === 0)) {
        match = path;
        extension = extensions[path];
      }
    }

    return extension;
  }

  requirejs.onResourceLoad = function (context, module, deps) {
    var styleNames = [];

    log.debug('Checking', module.name, 'for stylesheets');

    for (var i = 0; i < deps.length; i += 1) {
      var dep = deps[i];

      if (dep.prefix === pluginPrefix && styleLinks[dep.name] && !styleLinks[dep.name].loaded) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = styleLinks[dep.name].url;
        docHead.appendChild(link);
        styleLinks[dep.name].loaded = true;
        styleNames.push(styleLinks[dep.name].url);
      }
    }

    if (styleNames.length > 0) {
      log.info('Added', styleNames.length, 'stylesheets for', module.name, ':', styleNames);
    }

    if (onResourceLoad) onResourceLoad.apply(this, arguments);
  };

  return {
    version: "0.0.1",

    load: function (name, parentRequire, load, config) {
      var styleInfo = styleLinks[name];

      if (!styleInfo) {
        styleInfo = {
          name: name,
          url: parentRequire.toUrl(name),
          loaded: false
        };

        styleInfo.url = styleInfo.url.substring(0, styleInfo.url.lastIndexOf('.')) + findExtension(name);
        styleLinks[name] = styleInfo;
      }

      load({});
    }
  };
});

