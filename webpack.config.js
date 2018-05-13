const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    main: ['babel-polyfill', './client/index.js']
  },
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, 'client'),
    compress: true,
    disableHostCheck: true,
    host: 'localhost',
    hot: true,
    open: true,
    openPage: '',
    overlay: true,
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
      },
      {
        test: /\.scss$/,
        use: [
          prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  mode: prodMode ? 'production' : 'development',
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
    new CleanWebpackPlugin(['main/static'], {
      verbose: false
    }),
    new HtmlWebpackPlugin({
      title: 'Garden Hero',
      template: './client/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
      chunkFilename: 'main.css'
    })
  ],
  resolve: {
    modules: [path.resolve('./client'), path.resolve('./node_modules')],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'lodash-es': 'lodash'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'main/static')
  }
};
