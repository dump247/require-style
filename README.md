Plugin that uses requirejs dependency management to insert links to
stylesheets into the head of the document. Ensures that the order of the
stylesheets is maintained (stylesheets of dependencies are loaded before
the module's stylesheets).

# Dependencies

* [require-log](http://github.com/dump247/require-log)
* requirejs onResourceLoad hook [https://github.com/jrburke/requirejs/wiki/Internal-API%3A-onResourceLoad]

# Caveats

* Is dependent on an internal requirejs API (onResourceLoad)
* Style dependencies are only supported for modules (via define) and not
  for require calls. Unfortunately, there is no way to detect this
  condition or warn when it occurs.

# Usage

Add a dependency to a stylesheet:

```javascript
define(['style!my/style'], function (myStyle) {
  // A <link> tag has been added for the given stylesheet
});
```

The result should be something like this:

```html
<head>
  <link type="text/css" rel="stylesheet" href="/my/style.css"/>
</head>
```

# Configuration

## Extensions

By default, the style plugin uses a .css extension for stylesheets. This
can be changed globally or for specific stylesheets.

```javascript
require.config({
  config: {
    style: {
      extensions: {
        '*':              '.less', // change the default to .less
        'lib/css':        '.css',  // use .css for lib/css and files it contains
        'lib/css/stylus': '.styl'  // except for the stylus directory
      }
    }
  }
});
```

# TODO

* Detect when stylesheet is actually loaded. I have read that this is
  not well supported by major browsers.
* Generate single stylesheet or \<style\> elements during build

# License

The MIT License (MIT)  
Copyright (c) 2012 Cory Thomas

See [LICENSE](require-style/blob/master/LICENSE)

