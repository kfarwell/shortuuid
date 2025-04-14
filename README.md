# shortuuid

shortuuid is a simple JavaScript library that generates concise, unambiguous,
URL-safe UUIDs.   
Based on and compatible with the Python library
[shortuuid](https://github.com/stochastic-technologies/shortuuid), including
both 1.0.0 (MSB first) and legacy (MSB last, i.e. reversed) ShortUUID formats.

Often, one needs to use non-sequential IDs in places where users will see them,
but the IDs must be as concise and easy to use as possible. shortuuid solves
this problem by generating uuids using [uuid-1345][] and then
translating them to base57 using lowercase and uppercase letters and digits,
and removing similar-looking characters such as l, 1, I, O and 0.

  [![NPM version][npm-img]][npm-url]
  [![License][license-img]][license-url]

## Usage

```js
const ShortUUID = require('shortuuid')

const su = new ShortUUID('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz')

su.encode('6ca4f0f8-2508-4bac-b8f1-5d1e3da2247a')
// => 'MLpZDiEXM4VsUryR9oE8uc'

su.decode('MLpZDiEXM4VsUryR9oE8uc')
// => '6ca4f0f8-2508-4bac-b8f1-5d1e3da2247a'

su.uuid()
// => 'MLpZDiEXM4VsUryR9oE8uc'

su.uuid('example.com')
// => 'exu3DTbj2ncsn9tLdLWspw'

su.uuid('http://example.com')
// => 'T35fvrnVz6SMSdh9y5hs8c'

su.random()
// => 'c8sh5y9hdSMS6zVnrvf53T'

su.random(10)
// => 'c8sh5y9hdS'

const lsu = new ShortUUID('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', legacyMode = true)

lsu.encode('6ca4f0f8-2508-4bac-b8f1-5d1e3da2247a')
// => 'cu8Eo9RyrUsV4MXEiDZpLM'

lsu.decode('cu8Eo9RyrUsV4MXEiDZpLM')
// => '6ca4f0f8-2508-4bac-b8f1-5d1e3da2247a'
```

[uuid-1345]: https://github.com/scravy/uuid-1345

[npm-img]: https://img.shields.io/npm/v/@kfarwell/shortuuid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@kfarwell/shortuuid
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
