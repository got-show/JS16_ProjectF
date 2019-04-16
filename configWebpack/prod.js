var config = require('./common.js');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


var ocurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});
var extractTextPlugin = new ExtractTextPlugin("style.css");

config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css-loader!postcss-loader')
});

config.module.preLoaders.push({
  test: /\.css$/,
  loader: "csslint-loader",
  exclude: /node_modules/
});

config.plugins.push(ocurrenceOrderPlugin);
config.plugins.push(uglifyJsPlugin);
config.plugins.push(extractTextPlugin);
config.plugins.push(
  new CopyPlugin([{
    from: path.join(__dirname, '../static/gh-pages'),
    to: config.PATH_DIST
  }])
);

module.exports = config;
