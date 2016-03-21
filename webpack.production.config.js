var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'dist/main-[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('dist/styles-[hash].css')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel?presets[]=es2015']
    }, {
      test: /\.(css|scss)?$/,
      loader: ExtractTextPlugin.extract("style", "!css!sass!postcss")
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  },
  postcss: function () {
    return [autoprefixer]
  }
}