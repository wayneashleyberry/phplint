# phplint

[![Dependency Status](https://david-dm.org/wayneashleyberry/node-phplint/status.png?theme=shields.io)](https://david-dm.org/wayneashleyberry/node-phplint#info=dependencies)
[![devDependency Status](https://david-dm.org/wayneashleyberry/node-phplint/dev-status.png?theme=shields.io)](https://david-dm.org/wayneashleyberry/node-phplint#info=devDependencies)

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

## License

[MIT](http://opensource.org/licenses/MIT) © [Wayne Ashley Berry](https://twitter.com/waynethebrain)
