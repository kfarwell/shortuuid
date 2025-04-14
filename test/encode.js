'use strict'

const assert = require('assert')
const ShortUUID = require('..')
const uuids = require('./fixtures/uuids')

describe('ShortUUID#encode()', () => {
  uuids.map((item) => {
    let uid = item[0]
    let short = item[1]
    let legacy = item[1].split('').reverse().join('')

    it(`should encode to short, ${uid} => ${short}`, () => {
      let s = new ShortUUID()
      assert.ok(s.encode(uid) === short)
    })

    it(`should encode to legacy short, ${uid} => ${legacy}`, () => {
      let s = new ShortUUID(undefined, true)
      assert.ok(s.encode(uid) === legacy)
    })
  })
})
