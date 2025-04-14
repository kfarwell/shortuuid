'use strict'

const crypto = require('crypto')
const { v4, v5 } = require('uuid')

const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

module.exports = class ShortUUID {

  constructor(alphabet, legacyMode = false) {
    alphabet = alphabet || ALPHABET
    this.alphabet = alphabet
    this.length = alphabet.length
    this.legacy = legacyMode
  }

  /**
   * Convert a number to a string, using the given alphabet.
   *
   * @api private
   */
  _numToString(number, padToLen) {
    number = BigInt(number || 0)
    padToLen = padToLen || 0

    let output = ''
    while (number > 0n) {
      const digit = number % BigInt(this.length)
      number = number / BigInt(this.length)
      output = this.legacy
        ? output + this.alphabet[Number(digit)]
        : this.alphabet[Number(digit)] + output
    }

    if (padToLen) {
      const remainder = Math.max(padToLen - output.length, 0)
      output = this.legacy
        ? output + this.alphabet[0].repeat(remainder)
        : this.alphabet[0].repeat(remainder) + output
    }

    return output
  }

  /**
   * Encodes a UUID into a string (LSB first) according to the alphabet
   * If leftmost (MSB) bits 0, string might be shorter.
   *
   * @param {String} str - uuid
   * @param {Number} padToLen
   * @return {String} the short uuid
   */
  encode(str, padToLen) {
    str = str || ''
    padToLen = padToLen || 22
    let newstr = str.replace(/\-/g, '')
    return this._numToString(BigInt(`0x${newstr}`), padToLen)
  }

  /**
   * Convert a string to a number, using the given alphabet.
   *
   * @api private
   */
  _stringToNum(str) {
    let number = 0n
    let arr = str.split('')
    if (this.legacy) {
      arr = arr.reverse()
    }
    arr.forEach(char => {
      number = number * BigInt(this.length) + BigInt(this.alphabet.indexOf(char))
    })
    return number.toString(16)
  }

  /**
   * Decodes a string according to the current alphabet into a UUID
   * Raises ValueError when encountering illegal characters or too long string
   * If string too short, fills leftmost (MSB) bits with 0.
   *
   * @param {String} str - the short uuid
   * @return {String} the long uuid
   */
  decode(str) {
    str = this._stringToNum(str || '')
    let len = str.length
    if (len < 32) {
      str = '0'.repeat(32 - len) + str
    }
    return `${str.substring(0, 8)}-${str.substring(8, 12)}-` +
      `${str.substring(12, 16)}-${str.substring(16, 20)}-${str.substring(20)}`
  }

  /**
   * Calculate encoded length.
   *
   * @api private
   */
  encodedLength(numBytes) {
    numBytes = numBytes || 16
    const factor = Math.log(256) / Math.log(this.length)
    return Math.ceil(factor * numBytes)
  }

  /**
   * Generate and return a UUID.
   *
   * If the name parameter is provided, set the namespace to the provided
   * name and generate a UUID.
   */
  uuid(name, padToLen) {
    name = name || ''
    padToLen = padToLen || 22
    let id
    if (name === '') {
      id = v4()
    } else if (name.toLowerCase().startsWith('http')) {
      id = v5(name, v5.URL)
    } else {
      id = v5(name, v5.DNS)
    }
    return this.encode(id, padToLen)
  }

  /**
   * Generate and return a cryptographically-secure short random string
   * of the specified length.
   */
  random(len) {
    len = len || 22
    const randomStr = crypto.randomBytes(20).toString('hex')
    const num = BigInt(`0x${randomStr}`)
    return this._numToString(num, len).substring(0, len)
  }

}
