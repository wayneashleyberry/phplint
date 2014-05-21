'use strict';

var q = require('q');
var shell = require('shelljs/global');
var async = require('async');

var cache = require('./lib/cache');
var processPatterns = require('./lib/process');

var stdout = false;

var linter = function (file, cb) {
  cache.has(file, function(err, isCached, hash) {
    if (err) return cb(err);

    if (isCached) {
      if (stdout) {
        cache.get(hash, function (err, cached) {
          process.stdout.write(cached.contents);
        });
      }
      return cb();
    }

    exec('php -l '+file, {silent: ! stdout}, function (code, output) {
      var err = (code === 0) ? null : output.trim();

      if (err) return cb(err);

      cache.put(hash, output, cb);
    });
  });
};

module.exports = function (patterns, options) {
  var deferred = q.defer();
  var result = processPatterns(patterns);

  options = options || {};

  var limit = options.limit ? options.limit : 10;
  stdout = options.stdout ? options.stdout : false;

  async.eachLimit(result, limit, linter, function (err) {
    if (err) return deferred.reject(new Error(err.trim()));

    deferred.resolve(result.length + ' file(s) were linted.');
  });

  return deferred.promise;
};
