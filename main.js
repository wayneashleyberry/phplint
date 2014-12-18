var globby = require('globby');
var async = require('async');
var exec = require('child_process').exec;
var phpCmd = 'php';

function testPhp () {
  exec(phpCmd + ' -v', function(err, stdout, stderr) {
    if (err) throw new Error(err);
  });
}

function lint (path, callback) {
  return exec(phpCmd + ' -l '+ path, {
    cwd: process.cwd(),
    env: process.env
  }, callback);
}

module.exports = {

  lint: function (files, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!options.limit) options.limit = 10;
    if (options.phpCmd) phpCmd = options.phpCmd;

    testPhp();

    globby(files, function (err, paths) {
      async.eachLimit(paths, options.limit, function (item, cb) {
        // run on each file
        lint(item, cb);
      }, function (err, stdout, stderr) {
        // all files are done or there was an error
        callback(err, stdout, stderr);
      });
    });
  },

  gruntPlugin: function (grunt) {
    grunt.task.registerMultiTask('phplint', 'Lint PHP files in parallel.', function() {
      var done = this.async();

      testPhp();

      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        stdout: true,
        stderr: true,
        limit: 10
      });

      async.eachLimit(this.filesSrc, options.limit, function (item, callback) {
        // run on each file
        lint(item, function (err, stdout, stderr) {
          if (options.stdout) process.stdout.write(stdout);
          if (options.stderr) process.stderr.write(stderr);
          callback(err);
        });
      }, function (err, stdout, stderr) {
        // all files are done or there was an error
        done(err);
      });
    });
  }

};
