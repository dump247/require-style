/*global define, describe, it, expect */

define(['style', 'style!simple', 'style!other1', 'style!other1/a', 'style!other1/a/b/c'], function (style) {
  describe('Style', function () {
    it('has a version', function () {
      expect(style.version).toMatch(/\d+\.\d+\.\d+/);
    });

    it('loads a stylesheet as plugin', function () {
      var links = document.getElementsByTagName('link');
      expect(_(links).any(function (l) { return l.outerHTML.indexOf('href="./simple.css"') >= 0; })).toBe(true);
    });

    it('remaps extensions', function () {
      var links = document.getElementsByTagName('link');
      expect(_(links).any(function (l) { return l.outerHTML.indexOf('href="./other1.styl"') >= 0; })).toBe(true);
    });

    it('does prefix matching', function () {
      var links = document.getElementsByTagName('link');
      expect(_(links).any(function (l) { return l.outerHTML.indexOf('href="./other1/a.styl"') >= 0; })).toBe(true);
    });

    it('does longest prefix matching', function () {
      var links = document.getElementsByTagName('link');
      expect(_(links).any(function (l) { return l.outerHTML.indexOf('href="./other1/a/b/c.less"') >= 0; })).toBe(true);
    });
  });
});

