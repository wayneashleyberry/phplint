var _ = require('lodash');
var glob = require('glob');

// allows us to merge multiple glob patterns, grunt style.
// https://github.com/gruntjs/grunt/blob/master/lib/grunt/file.js#L47-L69

module.exports = function (patterns) {
  var result = [];

  if (_.isString(patterns)) {
    patterns = [patterns];
  }

  _.each(patterns, function (pattern) {
    var isExclusion = pattern.indexOf('!') === 0;

    if (isExclusion) {
      pattern = pattern.slice(1);
    }

    var matches = glob.sync(pattern);

    if (isExclusion) {
      result = _.difference(result, matches);
    } else {
      result = _.union(result, matches);
    }
  });

  return result;
};
