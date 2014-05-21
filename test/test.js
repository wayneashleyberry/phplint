'use strict';

var assert = require('assert');
var phplint = require('../index');

it('should call the fail method', function (cb) {
  var lint = phplint('test/*.php');
  lint.fail(function (err) {
    cb();
  });
});

it('should call the then method', function (cb) {
  var lint = phplint('test/pass.php');
  lint.then(function (msg) {
    cb();
  });
});
