[![NPM](https://nodei.co/npm/phplint.png?downloads=true&stars=true)](https://nodei.co/npm/phplint/)

[![Dependency Status](https://david-dm.org/wayneashleyberry/node-phplint/status.svg?style=flat)](https://david-dm.org/wayneashleyberry/node-phplint#info=dependencies)
[![devDependency Status](https://david-dm.org/wayneashleyberry/node-phplint/dev-status.svg?style=flat)](https://david-dm.org/wayneashleyberry/node-phplint#info=devDependencies)

## Command Line

```sh
$ npm install --global phplint
$ phplint **/*.php
```

## Node

```js
var phplint = require('phplint').lint;

lint(['src/**/*.php'], function (err, stdout, stderr) {
  if (err) throw new Error(err);

  // success!
});
```

### NPM

```json
{
  "scripts": {
    "pretest": "phplint src/**/*.php"
  },
  "devDependencies": {
    "phplint": "~2.0.0"
  }
}
```

```sh
$ npm test
```

## Grunt

```js
require('phplint').gruntPlugin(grunt);

grunt.initConfig({
  phplint: {
    files: 'src/**/*.php'
  }
});
```

## Gulp

```js
var phplint = require('phplint').lint;

gulp.task('phplint', function(cb) {
  phplint([], function (err, stdout, stderr) {
    if (err) cb(err);
    cb();
  });
});
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Wayne Ashley Berry](https://twitter.com/waynethebrain)
