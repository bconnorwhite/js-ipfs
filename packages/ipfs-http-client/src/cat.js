'use strict'

const CID = require('cids')
const configure = require('./lib/configure')
const toUrlSearchParams = require('./lib/to-url-search-params')

module.exports = configure(api => {
  return async function * cat (path, options = {}) {
    const res = await api.post('cat', {
      signal: options.signal,
      searchParams: toUrlSearchParams({
        arg: typeof path === 'string' ? path : new CID(path).toString(),
        ...options
      }),
      headers: options.headers
    })

    yield * res.iterator()
  }
})
