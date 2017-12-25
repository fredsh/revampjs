# revampjs
[![npm version](https://badge.fury.io/js/revampjs.svg)](https://badge.fury.io/js/revampjs)

Inspired by ES6 deconstruct. A safe extract of js object properties into a new object

I am still working on the ergonomics of this helper library so breaking changes are to be expected at the moment.
Please feel free to open an issue if you have any suggestion.

## Why revampjs?
ES6 brings to javascript a whole load of cool new features. Among them I find myself using the deconstruct operator pretty often.
However, I also often want to group the extracted variables within one object so I wish there was this kind of syntax available:
```javascript
// do not try this, it will not work!
const myNewObject = {a, b, c} = mySourceObject
```

So I ended up writing helper functions to do the result object wrapping. As it was becoming repetitive, I tried to wrap it up into this library. I hope it can useful for others as well.

## Features
- [x] Safely extract any value(s) (nested or not) from a source object
- [x] Rename extracted properties in destination object
- [x] Ligh-version for simply picking properties
- [ ] Support of an equivalent of {...rest} from ES6 (maybe)

## Plan
- [ ] Finaliwe syntax of parameter for values extraction
- [x] Add test cases to demo the usage
- [ ] Add travis conf

## Getting started

### install revampjs
- with npm
```
npm install --save revampjs
```
- or with yarn
```
yarn add revampjs
```

### import and use revampjs
- using require
```javascript
const revamp = require('revampjs');
```
- or using ES6 import (not tested yet)
```javascript
import * as revamp from 'revampjs';
```

```javascript
const sourceObject = {
  a: 42,
  b: 'hello',
  c: 'world',
  d: '!',
  e: {
    f: 'nested value'
  }
}

const myNewObject = revamp.pick(sourceObject, ['b', 'c']);

const myNewObjectRevamped = revamp.extract(sourceObject, {
  newKey: 'b',
  newKeyForNested: 'e.f'
});
```
