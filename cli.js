#!/usr/bin/env node

var exec = require('child_process').exec;
var args = process.argv.slice(2);
var cli = require('./').cli;

if (args.length === 0) {
  throw new Error('Invalid argument length');
}

exec('php -v', function(err, stdout, stderr) {
  if (err) throw new Error(err);
});

cli(args);