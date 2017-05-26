var path = require('path'),
  webpack = require("webpack"),
  libPath = path.join(__dirname, 'dev'),
  wwwPath = path.join(__dirname, 'deploy'),
  pkg = require('./package.json'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: path.join(libPath, 'index.js'),
  output: {
    path: path.join(wwwPath),
    filename: 'bundle-[hash:6].js'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=templates/[name]-[hash:6].html'
        }, {
      test: /\.(png|jpg)$/,
      loader: 'file?name=img/[name].[ext]' // inline base64 URLs for <=10kb images, direct URLs for the rest
        }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
        }, {
      test: /\.scss$/,
      loader: "style-loader!css!autoprefixer!sass-loader"
        }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "ng-annotate-loader?add=true!babel-loader"
        }, {
      test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
        }]
  },
  plugins: [
        // HtmlWebpackPlugin: Simplifies creation of HTML files to serve your webpack bundles : https://www.npmjs.com/package/html-webpack-plugin
        new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: pkg,
      template: path.join(libPath, 'index.html')
    }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;