var shell = require('shelljs/global');
var cache = require('./cache');

module.exports = function (file, options, cb) {
  cache.has(file, function(err, isCached, hash) {
    if (err) return cb(err);

    if (isCached && options.stdout) {
      cache.get(hash, function (err, cached) {
        process.stdout.write(cached.contents);
        cb();
      });
    }

    if (isCached && ! options.stdout) {
      cb();
    }

    exec('php -l '+file, {silent: ! options.stdout}, function (code, output) {
      var err = (code === 0) ? null : output.trim();

      if (err) return cb(err);

      cache.put(hash, output, cb);
    });
  });
};
