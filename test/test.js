'use strict';

var assert = require('assert');
var phplint = require('../index');

require('shelljs/global');

it('should have php', function (cb) {
  if (! which('php')) {
    assert.fail(which('php'), '/usr/local/bin/php');
  }
  cb();
});

it('should call the fail method', function (cb) {
  var lint = phplint('test/*.php');
  lint.fail(function (err) {
    cb();
  });
});

it('should call the then method', function (cb) {
  var lint = phplint('test/pass.php', {stdout: true});
  lint.then(function (msg) {
    cb();
  });
});
