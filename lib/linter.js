'use strict';

var cache = require('./cache');
var shell = require('shelljs/global');

module.exports = {

  stdout: false,

  lint: function (file, cb) {
    var self = this;

    cache.has(file, function(err, isCached, hash) {
      if (err) return cb(err);

      if (isCached && self.stdout) {
        return cache.get(hash, function (err, cached) {
          process.stdout.write(cached.contents);
          cb();
        });
      }

      if (isCached && ! self.stdout) {
        return cb();
      }

      exec('php -l '+file, {silent: ! self.stdout}, function (code, output) {
        var err = (code === 0) ? null : output.trim();

        if (err) return cb(err);

        cache.put(hash, output, cb);
      });
    });
  }

};
