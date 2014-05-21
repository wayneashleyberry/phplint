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

phplint('src/app/**/*.php', function (err) {
  if (err) throw new Error(err);
});
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Wayne Ashley Berry](https://twitter.com/waynethebrain)
