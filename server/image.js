'use strict'

let http = require('http')
let https = require('https')
let url = require('url')

module.exports = function(request, response) {
  response.setHeader('Content-Type', 'image/jpeg')

  let imageUrl = url.parse(request.url).path.slice(1)
  if (imageUrl) {
    imageUrl = decodeURIComponent(imageUrl)

    let httpServer
    if (imageUrl.startsWith('http://')) {
      httpServer = http
    } else if (imageUrl.startsWith('https://')) {
      httpServer = https
    }

    httpServer.get(imageUrl, (res) => {
      res.pipe(response)
    })
  }
}
