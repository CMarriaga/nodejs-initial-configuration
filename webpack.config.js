const path = require('path')
const nodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')
// const MinifyPlugin = require('babel-minify-webpack-plugin');

const NodemonPlugin = require('nodemon-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator');

let webpackConfig = {
  target: 'node',
  context: path.resolve(__dirname),
  entry: './server.js',
  output: {
    path: path.resolve(__dirname + '/dist')
  },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}

if (process.env.NODE_ENV === 'production') {
  webpackConfig = {
    ...webpackConfig,
    plugins: [
      new JavaScriptObfuscator({
        rotateStringArray: true
      }, ['./dist/main.js']),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          test: /.js$/,
          exclude: /node_modules/
        })
      ],
    }
  }
} else {
  webpackConfig = {
    ...webpackConfig,
    plugins: [
      new NodemonPlugin(process.env.NODE_ENV === 'debug' && {
        nodeArgs: `--inspect=${process.env.DEBUG_HOST}:${process.env.DEBUG_PORT}`
      })
    ],
    devtool: 'inline-source-map',
  }
}

module.exports = webpackConfig
