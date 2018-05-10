const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    main: ['babel-polyfill', './client/index.js']
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'prod'),
    compress: true,
    disableHostCheck: true,
    host: 'localhost',
    hot: true,
    open: true,
    openPage: '',
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: [
                'transform-class-properties',
                'transform-object-rest-spread'
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      }
    ]
  },
  node: {
    dns: 'empty',
    global: true,
    fs: 'empty',
    net: 'empty',
    process: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['prod'], {
      verbose: false
    }),
    new HtmlWebpackPlugin({
      title: 'Garden Hero',
      template: './client/index.html'
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ],
  resolve: {
    modules: [path.resolve('./client'), path.resolve('./node_modules')],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'lodash-es': 'lodash'
    }
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'prod/assets')
  }
};
