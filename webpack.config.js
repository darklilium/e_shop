const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifier = require('webpack-build-notifier');
const isProduction = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  devtool: isProduction ? 'hidden-source-map' : 'inline-source-map',
  entry: {
    main: './static/js/apps/main.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['es2015', {modules: false}], 'react', 'stage-3']
            }
          }
        ]
      }
    ]
  },
  resolve : {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'/* add additional folders right here */]
  },
  plugins: [
    new WebpackBuildNotifier(),
    new HtmlWebpackPlugin({
      title: "Eve ShoppingCart",
      template: './templates/index.hbs',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      },
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
