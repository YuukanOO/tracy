const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env) => {
  const isDev = !(env && env.prod);

  return {
    entry: {
      polyfill: 'babel-polyfill',
      app: './src/boot.js',
    },
    output: {
      path: path.resolve(__dirname, './docs'),
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
          use: isDev ? ['style-loader', 'css-loader', 'sass-loader'] : ExtractTextPlugin.extract({
            use: ['css-loader?minimize', 'sass-loader'],
          }),
        },
        {
          test: /.js$/,
          use: 'babel-loader',
          exclude: path.resolve('./node_modules'),
        },
        {
          test: /.vue$/,
          loader: 'vue-loader',
          options: { extractCSS: !isDev },
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
    ].concat(isDev ? [] : [
      new ExtractTextPlugin('styles.css'),
    ]),
  };
};
