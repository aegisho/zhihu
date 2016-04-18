'use strict'

let http = require('http')
let url = require('url')

module.exports = function(request, response) {
  response.setHeader('Content-Type', 'image/jpeg')

  let imageUrl = url.parse(request.url).path.slice(1)
  imageUrl = decodeURIComponent(imageUrl)

  http.get(imageUrl, (res) => {
    res.pipe(response)
  })
}
