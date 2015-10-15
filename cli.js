#!/usr/bin/env node

var exec = require('child_process').exec
var args = process.argv.slice(2)
var cli = require('./').cli
var suppress = false

if (args.length === 0 || (args.length === 1 && args[0] === 'help')) {
  console.log([
    '',
    '  Usage: phplint [path]',
    '',
    '  Examples:',
    '  phplint "app/**/*.php"',
    '  phplint "**/*.php" "!vendor/**"',
    ''
  ].join('\n'))
}

if (args[0] === '-v' || args[0] === '--version') {
  var pkg = require('./package.json')
  console.log(pkg.version)
  process.exit()
}

if (args.indexOf('-s') !== -1 || args.indexOf('--suppress') !== -1) {
  suppress = true
}

exec('php -v', function (err, stdout, stderr) {
  if (err) throw new Error(err)
})

cli(args, {suppress: suppress})
