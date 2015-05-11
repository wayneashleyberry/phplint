#!/usr/bin/env node

var exec = require('child_process').exec
var args = process.argv.slice(2)
var cli = require('./').cli

if (args.length === 0) {
  throw new Error('Invalid argument length')
}

if (args[0] === '-v' || args[0] === '--version') {
  var pkg = require('./package.json')
  console.log(pkg.version)
  process.exit()
}

exec('php -v', function (err, stdout, stderr) {
  if (err) throw new Error(err)
})

cli(args)
