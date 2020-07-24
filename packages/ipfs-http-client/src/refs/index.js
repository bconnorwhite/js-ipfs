'use strict'

const { Buffer } = require('buffer')
const CID = require('cids')
const toCamel = require('../lib/object-to-camel')
const configure = require('../lib/configure')
const toUrlSearchParams = require('../lib/to-url-search-params')

module.exports = configure((api, options) => {
  const refs = async function * (args, options = {}) {
    if (!Array.isArray(args)) {
      args = [args]
    }

    const res = await api.post('refs', {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: args.map(arg => `${Buffer.isBuffer(arg) ? new CID(arg) : arg}`),
        ...options
      }),
      headers: options.headers,
      transform: toCamel
    })

    yield * res.ndjson()
  }
  refs.local = require('./local')(options)

  return refs
})
