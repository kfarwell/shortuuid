'use strict'

const assert = require('assert')
const ShortUUID = require('..')

describe('ShortUUID#uuid()', () => {

  let su

  before(() => {
    su = new ShortUUID()
  })

  it('should generate with uuid v4', () => {
    assert.ok(su.uuid().length > 0)
  })

  it('should generate with uuid v5 and dns namespace', () => {
    assert.ok(su.uuid('example.com') === 'exu3DTbj2ncsn9tLdLWspw')
  })

  it('should generate with uuid v5 and url namespace', () => {
    assert.ok(su.uuid('http://example.com') === 'T35fvrnVz6SMSdh9y5hs8c')
  })

})
