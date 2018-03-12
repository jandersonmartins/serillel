# serillel [![Build Status](https://travis-ci.org/jandersonmartins/serillel.svg?branch=master)](https://travis-ci.org/jandersonmartins/serillel)

Lib to handle async tasks with serial and parallel flow.

## Installation

```bash
$  npm i serillel --save
```

## Example Serial

```js
const tasks = [
  () => new Promise(resolve => resolve('foo')),
  () => new Promise(resolve => resolve('bar')),
  () => new Promise((resolve, reject) => reject(new Error()))
]

serillel.serial(tasks).then(console.log)

// output
// { success: [ 'foo', 'bar' ], errors: [ Error... ] }
```

## Example parallel

```js
const tasks =[
  () => new Promise((resolve, reject) =>
    setTimeout(() => resolve('foo'), 100)
  ),

  () => new Promise((resolve, reject) =>
    setTimeout(() => resolve('bar'), 0)
  ),

  () => new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error()), 0)
  )
]

serillel.parallel(tasks).then(console.log)

// output
// { success: [ 'bar', 'foo' ], errors: [ Error... ] }
```
