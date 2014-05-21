# phplint

[![Build Status](https://travis-ci.org/wayneashleyberry/node-phplint.svg)](https://travis-ci.org/wayneashleyberry/node-phplint)
[![Dependency Status](https://david-dm.org/wayneashleyberry/node-phplint/status.png?theme=shields.io)](https://david-dm.org/wayneashleyberry/node-phplint#info=dependencies)
[![devDependency Status](https://david-dm.org/wayneashleyberry/node-phplint/dev-status.png?theme=shields.io)](https://david-dm.org/wayneashleyberry/node-phplint#info=devDependencies)

Inspired by and largely copied from [jgable/grunt-phplint](https://github.com/jgable/grunt-phplint) but in a build-tool agnostic manner.

## Install

```sh
$ npm install --save-dev phplint
```

## Usage

```js
var phplint = require('phplint');

var lint = phplint('src/app/**/*.php');

lint.then(function (msg) {
  console.log(msg);
});

lint.fail(function (err) {
  console.error(err);
});
```

### Gulp

```js
var gulp = require('gulp');
var phplint = require('phplint');

gulp.task('phplint', function () {
  return phplint('src/app/**/*.php');
});

gulp.task('default', ['phplint']);
```

## Options

### limit

Sets the process spawn limit, defaults to 10.

```js
var phplint = require('phplint');

phplint('src/*.php', {
  limit: 2
});
```

### stdout

Prints to stdout, defaults to false. Useful for debugging.

```js
var phplint = require('phplint');

phplint('src/*.php', {
  stdout: true
});
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Wayne Ashley Berry](https://twitter.com/waynethebrain)
