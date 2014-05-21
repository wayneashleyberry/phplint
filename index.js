'use strict';

var _ = require('lodash');
var q = require('q');
var glob = require('glob');
var shell = require('shelljs/global');
var async = require('async');
var cache = require('./lib/cache');

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

var processPatterns = function (patterns) {
  var result = [];

  if (_.isString(patterns)) {
    patterns = [patterns];
  }

  _.each(patterns, function (pattern) {
    var exclusion = pattern.indexOf('!') === 0;

    if (exclusion) {
      pattern = pattern.slice(1);
    }

    var matches = glob.sync(pattern);

    if (exclusion) {
      result = _.difference(result, matches);
    } else {
      result = _.union(result, matches);
    }
  });

  return result;
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
