'use strict';

var q = require('q');
var async = require('async');

var linter = require('./lib/linter');
var processPatterns = require('./lib/process');

module.exports = function (patterns, options) {
  var deferred = q.defer();
  var result = processPatterns(patterns);

  options = options || {};

  var limit = options.limit ? options.limit : 10;
  var stdout = options.stdout ? options.stdout : false;

  async.eachLimit(result, limit, function (file, cb) {
    linter(file, {stdout: stdout}, cb);
  }, function (err) {
    if (err) return deferred.reject(new Error(err.trim()));

    deferred.resolve(result.length + ' file(s) were linted.');
  });

  return deferred.promise;
};
