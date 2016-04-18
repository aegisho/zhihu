var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/main.jsx',
    vendors: ['react', 'react-dom', 'history', 'react-router']
  },
  output: {
    path: path.resolve(__dirname, './dist/static'),
    publicPath: 'static/',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx/,
      loader: 'react-hot-loader!babel!eslint'
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      exclude: /node_modules|(lib)/
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
}
