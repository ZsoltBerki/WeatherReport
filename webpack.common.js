const path = require('path');
const webpack = require('webpack');

const SRC = path.resolve(__dirname, 'src/main/react');
const DEST = path.resolve(__dirname, 'app/js/');

module.exports = {
  entry: {
    client: [SRC + '/client.tsx']
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  output: {
    path: DEST,
    filename: '[name].bundle.js',
    library: 'client'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: SRC
      }
    ]
  }
};
