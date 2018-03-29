'use strict'

const serillel = require('../lib')

const tasks =[
  () => new Promise((resolve, reject) =>
    setTimeout(() => resolve('foo'), 100)
  ),

  () => new Promise((resolve, reject) =>
    setTimeout(() => resolve('bar'), 0)
  ),

  () => new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error()), 100)
  ),

  () => new Promise((resolve, reject) =>
    setTimeout(() => reject(new TypeError()), 0)
  )
]

serillel.parallel(tasks).then(console.log)
