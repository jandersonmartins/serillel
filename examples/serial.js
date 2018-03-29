'use strict'

const serillel = require('../lib')

const tasks = [
  () => new Promise(resolve => resolve('foo')),
  () => new Promise(resolve => resolve('bar')),
  () => new Promise((resolve, reject) => reject(new TypeError())),
  () => new Promise((resolve, reject) => reject(new Error()))
]

serillel.serial(tasks).then(console.log)
