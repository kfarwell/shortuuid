'use strict'

const assert = require('assert')
const ShortUUID = require('..')
const uuids = require('./fixtures/uuids')

describe('ShortUUID#decode()', () => {
  uuids.map((item) => {
    let uid = item[0]
    let short = item[1]
    let legacy = item[1].split('').reverse().join('')

    it(`should decode short to long, ${short} => ${uid}`, () => {
      let s = new ShortUUID()
      assert.ok(s.decode(short) === uid)
    })

    it(`should decode legacy short to long, ${legacy} => ${uid}`, () => {
      let s = new ShortUUID(undefined, true)
      assert.ok(s.decode(legacy) === uid)
    })
  })
})
