var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    app: './src/main.jsx',
    vendors: ['react', 'react-dom', 'history', 'react-router']
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
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
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&camelCase&localIdentName=[name]__[local]-[hash:base64:5]!postcss',
      exclude: path.resolve(__dirname, '../src/styles'),
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss',
      include: path.resolve(__dirname, '../src/styles'),
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] })
  ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
}
