'use strict'

let http = require('http')

let api = require('./api')
let image = require('./image')
let port = require('./port')

http.createServer(api).listen(port.api)
http.createServer(image).listen(port.image)

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`)
})

console.log('proxy running')
