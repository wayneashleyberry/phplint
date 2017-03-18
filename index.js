var globby = require('globby')
var async = require('async')
var execFile = require('child_process').execFile
var phpCmd = 'php'
var os = require('os')
var crypto = require('crypto')
var fs = require('fs')
var CacheSwap = require('cache-swap')
var SWAP_CATEGORY = 'linted'
var CACHE_DIR = 'php-lint'
var CACHE_TMP_DIR = os.tmpdir()

function testPhp () {
  execFile(phpCmd, ['-v'], function (err, stdout, stderr) {
    if (err) throw new Error(err)
  })
}

function lint (path, callback) {
  return execFile(phpCmd, ['-d', 'display_errors=1', '-l', path], {
    cwd: process.cwd(),
    env: process.env
  }, callback)
}

function iterate (filePaths, options, callback) {
  var swap = null

  if (options.useCache) {
    swap = new CacheSwap({cacheDirName: options.cacheDirName, tmpDir: options.tmpDir})
  }

  async.eachLimit(filePaths, options.limit, function (filePath, next) {
    // If no cache then just lint
    if (!swap) {
      return lint(filePath, function (err, stdout, stderr) {
        if (options.stdout) {
          if (options.suppress) {
            if (stdout.substr(0, 28) !== 'No syntax errors detected in') {
              process.stdout.write(stdout)
            }
          } else {
            process.stdout.write(stdout)
          }
        }

        if (options.stderr) process.stderr.write(stderr)

        next(err)
      })
    }

    // Cache-enabled only code path
    var readFile = function (next) {
      fs.readFile(filePath, next)
    }

    var sha1File = function (fileContent, next) {
      var sha1 = crypto.createHash('sha1')
      var fileSha1 = sha1.update(fileContent.toString()).digest('hex')

      return next(null, fileSha1)
    }

    async.waterfall([readFile, sha1File], function (err, sha1) {
      if (err) return next(err)

      swap.hasCached(SWAP_CATEGORY, sha1, function (isCached) {
        if (isCached) return next()

        lint(filePath, function (err, stdout, stderr) {
          if (options.stdout) process.stdout.write(stdout)
          if (options.stderr) process.stderr.write(stderr)

          if (err || stderr) return next(err, stdout, stderr)

          swap.addCached(SWAP_CATEGORY, sha1, '', next)
        })
      })
    })
  }, function (err, stdout, stderr) {
    // all files are done or there was an error
    callback(err)
  })
}

module.exports = {
  cli: function (pathsArgs, opt, cb) {
    globby(pathsArgs).then(function (paths) {
      var options = {
        stdout: true,
        stderr: true,
        limit: 10,
        suppress: opt.suppress
      }

      var callback = function (err) {
        if (cb) return cb(err)

        if (err) throw new Error(err)
      }

      return iterate(paths, options, callback)
    })
  },

  lint: function (files, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {
        useCache: true,
        cacheDirName: CACHE_DIR,
        tmpDir: CACHE_TMP_DIR
      }
    }

    if (!options.limit) options.limit = 10
    if (options.phpCmd) phpCmd = options.phpCmd

    testPhp()

    globby(files).then(function (paths) {
      iterate(paths, options, callback)
    })
  },

  clearCache: function (cacheDirName, tmpDir, callback) {
    if (typeof cacheDirName === 'function') {
      callback = cacheDirName
      cacheDirName = CACHE_DIR
      tmpDir = CACHE_TMP_DIR
    }

    var cache = new CacheSwap({cacheDirName: cacheDirName, tmpDir: tmpDir})
    cache.clear(null, callback)
  },

  gruntPlugin: function (grunt) {
    grunt.task.registerMultiTask('phplint', 'Lint PHP files in parallel.', function () {
      var done = this.async()

      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        stdout: true,
        stderr: true,
        limit: 10,
        useCache: true,
        phpCmd: 'php',
        cacheDirName: CACHE_DIR,
        tmpDir: CACHE_TMP_DIR
      })

      if (options.phpCmd) phpCmd = options.phpCmd

      testPhp()

      iterate(this.filesSrc, options, done)
    })
  }
}
