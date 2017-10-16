# is-api

Inspired by the [is.js](http://is.js.org/) micro library, this is tiny library that you can extend with your own type checking (and more) methods and benefit from the interfaces `not`, `all` and `any` the library provides with.

By default, the library is "naked". Use the `extend()` method to provide it with your own type checking methods.

## Why?

Because I liked the idea to do my type checks using a more functional way, but I also wanted to include only the methods I needed at any project.

## Install

### npm

```sh
$ npm install --save is-api
```

### GIT

```sh
$ git clone https://github.com/georapbox/is-api.git
```

## Usage example
```js
var is = require('is-api');

is.extend({
  'array': Array.isArray,
  'greaterThanFive': function (value) {
    return val > 5;
  }
});

// Check if a value is array
is.array([1, 2, 3]);
// -> true

is.array({foo: 'bar'});
// -> false

// Check if a value is NOT an array
is.not.array([1, 2, 3]);
// -> false

is.not.array({foo: 'bar'});
// -> true

// Check if all values are arrays
is.all.array([1, 2, 3], ['a', 'b', 'c']);
// -> true

is.all.array([1, 2, 3], 10);
// -> false

// Check if any of the values are arrays
is.any.array([1, 2, 3], 10);
// -> true

is.any.array(5, 10);
// -> false

// Check if a value is greater than 5
is.greaterThanFive(6);
// -> true

is.greaterThanFive(3);
// -> false

is.not.greaterThanFive(6);
// -> false

is.not.greaterThanFive(3);
// -> true

is.any.greaterThanFive(3, 7);
// -> true

is.any.greaterThanFive(2, 5, 4);
// -> false

is.all.greaterThanFive(6, 10, 45);
// -> true
```

## No Conflict

When the library is used in a normal browser global namespace environment, you can use `noConflict()` method which returns the current API instance to you in order not to pollute your global namespace.

```js
var utils = {};

utils.is = is.noConflict();

utils.is.extend({...});
```
