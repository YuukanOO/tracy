const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    app: './src/boot.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash].js',
    publicPath: '',
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /.js$/,
        use: 'babel-loader',
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /.vue$/,
        use: 'vue-loader',
        exclude: path.resolve('./node_modules'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['polyfill', 'app'],
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
