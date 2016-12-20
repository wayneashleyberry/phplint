## phplint

> phplint is a node wrapper around the native php linter that allows for
> parallel linting and integration with build systems like
> [Grunt](http://gruntjs.com/), [Gulp](http://gulpjs.com/) and more.

[![npm](http://img.shields.io/npm/v/phplint.svg?style=flat)](https://www.npmjs.com/package/phplint)
[![Build Status](https://travis-ci.org/wayneashleyberry/phplint.svg?branch=master)](https://travis-ci.org/wayneashleyberry/phplint)

### Usage

#### CLI

```sh
$ npm i -g phplint
$ phplint '**/*.php'
```

Paths and filenames are parsed using
[globby](https://github.com/sindresorhus/globby), so the following would work
as well:

```sh
$ phplint '**/*.php' '!vendor/**'
```

#### Node

```js
var phplint = require('phplint').lint

phplint(['src/**/*.php'], function (err, stdout, stderr) {
  if (err) throw new Error(err)

  process.stdout.write(stdout)
  process.stderr.write(stderr)

  // success!
})
```

#### NPM

```json
{
  "scripts": {
    "pretest": "phplint 'src/**/*.php'"
  },
  "devDependencies": {
    "phplint": "~1.0.0"
  }
}
```

```sh
$ npm test
```

#### Grunt

##### Configure cache directories

This module uses the `cache-swap` module to cache already linted files.
You can configure the cache directories via the `cacheDirName` and the `tmpDir` options.
Both options will be passed to the CacheSwap instance when created.

```js
module.exports = function (grunt) {
  require('phplint').gruntPlugin(grunt)

  grunt.initConfig({
    phplint: {
      options: {
        limit: 10,
        phpCmd: '/home/scripts/php', // Defaults to php
        stdout: true,
        stderr: true,
        useCache: true, // Defaults to false
        tmpDir: '/custom/root/folder', // Defaults to os.tmpDir()
        cacheDirName: 'custom/subfolder' // Defaults to php-lint
      },
      files: 'src/**/*.php'
    }
  })

  grunt.registerTask('test', ['phplint'])

}
```

```sh
$ grunt test
```

#### Gulp

The same options that can be used in Grunt can be used in Gulp too.

```js
var gulp = require('gulp')
var phplint = require('phplint').lint

gulp.task('phplint', function (cb) {
  phplint(['src/**/*.php'], {limit: 10}, function (err, stdout, stderr) {
    if (err) {
      cb(err)
      process.exit(1)
    }
    cb()
  })
})

gulp.task('test', ['phplint'])
```

```sh
$ gulp test
```

### Related

- [phpl](https://github.com/wayneashleyberry/phpl)

### License

[MIT](http://opensource.org/licenses/MIT) © [Wayne Ashley Berry](https://wayne.cloud)
