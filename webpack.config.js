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
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    disableHostCheck: true,
    host: 'localhost',
    hot: true,
    open: true,
    openPage: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
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
    new CleanWebpackPlugin(['dist'], {
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
    modules: [path.resolve('./client'), path.resolve('./node_modules')]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
