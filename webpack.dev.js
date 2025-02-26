const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    watchFiles: ['src/**/*'],
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});