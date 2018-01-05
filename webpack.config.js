var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: [
    //'webpack/hot/poll?1000',
    './src/server.js'
    ],
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.bundle.js',
    hotUpdateChunkFilename: '../.hot/hot-update.js',
    hotUpdateMainFilename: '../.hot/hot-update.json'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({banner:'require("source-map-support").install();', raw: true, entryOnly: false }),
    new webpack.HotModuleReplacementPlugin({ quiet: true }),
    new webpack.NamedModulesPlugin()
  ],
};