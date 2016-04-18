var config = require('./webpack.base.config')
var port = require('../server/port')

config.devtool = 'eval-source-map'

config.devServer = {
  host: '0.0.0.0',
  port: port.web,
  historyApiFallback: true,
  noInfo: true
}

module.exports = config
