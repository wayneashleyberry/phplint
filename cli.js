#!/usr/bin/env node

var globby = require('globby');
var async = require('async');
var exec = require('child_process').exec;
var args = process.argv.slice(2);
var limit = 10;

if (args.length === 0) {
  throw new Error('Invalid argument length');
}

exec('php -v', function(err, stdout, stderr) {
  if (err) {
    throw new Error(err);
  }

  console.log(stdout);
});

globby(args, function (err, paths) {
  if (err) throw new Error(err);

  async.eachLimit(paths, limit, function (item, callback) {
    // run on each item
    var child = exec('php -l '+item, {
      cwd: process.cwd(),
      env: process.env
    }, function (err, stdout, stderr) {
      // done on a single item
      process.stdout.write(stdout);
      process.stderr.write(stderr);
      callback(err);
    });
  }, function (err) {
    // all items are done
    if (err) process.exit(1);
  });
});
