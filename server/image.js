'use strict'

let http = require('http')
let https = require('https')
let url = require('url')

module.exports = function proxyImage(request, response) {
  response.setHeader('Content-Type', 'image/jpeg')

  let imageUrl = request.url.slice(1)

  if (imageUrl && imageUrl !== 'favicon.ico') {
    imageUrl = decodeURIComponent(imageUrl)

    let httpServer
    if (imageUrl.startsWith('https://')) {
      httpServer = https
    } else {
      httpServer = http
    }

    httpServer.get(imageUrl, (res) => {
      if (res.statusCode === 302) {
        let location = res.headers.location
        location = `/${encodeURIComponent(location)}`

        response.writeHead(302, { Location: location })
        response.end()
      } else {
        res.pipe(response)
      }
    })
  }
}
