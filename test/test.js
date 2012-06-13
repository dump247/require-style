/*global define, describe, it, expect */

define(['style', 'style!simple'], function (style, simpleStyle) {
  describe('Style', function () {
    it('has a version', function () {
      expect(style.version).toMatch(/\d+\.\d+\.\d+/);
    });

    it('loads a stylesheet as plugin', function () {
      var links = document.getElementsByTagName('link');
      expect(_(links).any(function (l) { return l.outerHTML.indexOf('href="./simple.css"') >= 0; })).toBe(true);
    });
  });
});

