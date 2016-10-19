# rimtest

## Dependencies

* [Python](https://www.continuum.io/downloads) (>v2.7)
* [NodeJS](https://nodejs.org) (v4.x LTS)
* [Gulp](http://gulpjs.com) (3.9.x)

## Installation

```shell
$> pip install flask flask_cors
$> cd frontend && npm install
```

## Available commands

To start python server:

```shell
$> python server.py
```


To start development mode:

```shell
$> cd frontend && gulp serve
```

To Check Hint:

```shell
$> cd frontend && gulp eslint
```

```

### JavaScript

We use the [EcmaScript 2015](http://www.ecma-international.org/ecma-262/6.0/) (formerly EcmaScript 6) language specification. Since it is not yet supported in all modern browsers, we use [Browserify](http://browserify.org) module loader with [BabelJS](http://babeljs.io) transpiler to polyfill EcmaScript 2015.
