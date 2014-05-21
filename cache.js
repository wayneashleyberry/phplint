var crypto = require('crypto');
var cacheSwap = require('cache-swap');
var fs = require('fs');

var swap = new cacheSwap({
  tmpDir: require('os').tmpDir(),
  cacheDirName: 'node-phplint'
});

var SWAP_CATEGORY = 'linted';

module.exports = {

  put: function (hash, cb) {
    swap.addCached(SWAP_CATEGORY, hash, '', function (err) {
      if (err) return cb(err);
      cb();
    });
  },

  has: function (file, cb) {
    fs.readFile(file, function(err, contents) {
      if (err) return cb(err);

      var sha1 = crypto.createHash('sha1');
      var hash = sha1.update(contents.toString()).digest('hex');

      swap.hasCached(SWAP_CATEGORY, hash, function(isCached, cachedPath) {
        cb(null, isCached, hash);
      });
    });
  }

};
