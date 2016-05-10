var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './unit/index.js',
  output: {
    path: path.resolve(__dirname, './units'),
    filename: 'specs.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
  devServer: {
    contentBase: './test/unit',
    noInfo: true
  },
  devtool: 'source-map'
}
