[![NPM](https://nodei.co/npm/phplint.png?downloads=true&stars=true)](https://nodei.co/npm/phplint/)

[![Dependency Status](https://david-dm.org/wayneashleyberry/node-phplint/status.svg?style=flat)](https://david-dm.org/wayneashleyberry/node-phplint#info=dependencies)
[![devDependency Status](https://david-dm.org/wayneashleyberry/node-phplint/dev-status.svg?style=flat)](https://david-dm.org/wayneashleyberry/node-phplint#info=devDependencies)

## CLI

```sh
$ npm install --global phplint
$ phplint **/*.php
```

## Node

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

## Grunt

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

## Gulp

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

## License

[MIT](http://opensource.org/licenses/MIT) © [Wayne Ashley Berry](https://twitter.com/waynethebrain)
