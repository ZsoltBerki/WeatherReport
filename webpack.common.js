const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC = path.resolve(__dirname, 'src/main/react');
const DEST = path.resolve(__dirname, 'app/js/');

module.exports = {
  entry: {
    client: [SRC + '/client.js']
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: DEST,
    filename: '[name].bundle.js',
    library: 'client'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: SRC
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
};
