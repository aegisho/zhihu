'use strict'

let http = require('http')
let url = require('url')

const VERSION = 4
const DOMAIN = `http://news-at.zhihu.com/api/${VERSION}`

module.exports = function(request, response) {
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Access-Control-Allow-Origin', '*')

  let api = url.parse(request.url).path
  let zhihuUrl = DOMAIN + api

  http.get(zhihuUrl, (res) => {
    res.pipe(response)
  })
}
