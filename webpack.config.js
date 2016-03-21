var path = require('path')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    filename: 'main.js',
    publicPath: '/assets/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel?presets[]=es2015','webpack-module-hot-accept']
    }, {
      test: /\.(css|scss)?$/,
      loader: "style!css!sass!postcss"
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  },
  postcss: function () {
    return [autoprefixer]
  }
}