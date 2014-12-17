[![NPM](https://nodei.co/npm/phplint.png?downloads=true&stars=true)](https://nodei.co/npm/phplint/)

[![Build Status](https://travis-ci.org/wayneashleyberry/node-phplint.svg?branch=master)](https://travis-ci.org/wayneashleyberry/node-phplint)
[![Dependency Status](https://david-dm.org/wayneashleyberry/node-phplint/status.svg?style=flat)](https://david-dm.org/wayneashleyberry/node-phplint#info=dependencies)
[![devDependency Status](https://david-dm.org/wayneashleyberry/node-phplint/dev-status.svg?style=flat)](https://david-dm.org/wayneashleyberry/node-phplint#info=devDependencies)

## PHPLint

A simple node wrapper to run `php -l` in parallel.

Running `find . -type f -name "*.php" | xargs -n 1 php -l` in a brand new
Laravel project (with dependencies) took 1m 32s to find its first error. Running `phplint
'**/*.php'` in the same project took 37s to find the same error.

### CLI

```sh
$ npm install --global phplint
$ phplint **/*.php
```

### Node

```js
var phplint = require('phplint').lint;

lint(['src/**/*.php'], function (err, stdout, stderr) {
  if (err) throw new Error(err);

  process.stdout.write(stdout);
  process.stderr.write(stderr);

  // success!
});
```

### NPM

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

### Grunt

```js
module.exports = function(grunt) {

  require('phplint').gruntPlugin(grunt);

  grunt.initConfig({
    phplint: {
      options: {
        limit: 10,
        stdout: true,
        stderr: true
      },
      files: 'src/**/*.php'
    }
  });

  grunt.registerTask('test', ['phplint']);

};
```

```sh
$ grunt test
```

### Gulp

```js
var gulp = require('gulp');
var phplint = require('phplint').lint;

gulp.task('phplint', function(cb) {
  phplint(['src/**/*.php'], {limit: 10}, function (err, stdout, stderr) {
    if (err) {
      cb(err);
      process.exit(1);
    }
    cb();
  });
});

gulp.task('test', ['phplint']);
```

```sh
$ gulp test
```

#### License

[MIT](http://opensource.org/licenses/MIT) © [Wayne Ashley Berry](https://twitter.com/waynethebrain)
