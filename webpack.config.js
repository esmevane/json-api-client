/* eslint no-undef: "off" */

var webpack = require("webpack")
var path = require("path")
var meta = { port: 9002 }
var publicPath
var entry = []
var plugins = []

if (process.env.NODE_ENV !== "production") {
  entry.push(`webpack-dev-server/client?http://localhost:${meta.port}`)
  entry.push("webpack/hot/only-dev-server")

  plugins.push(new webpack.HotModuleReplacementPlugin())

  publicPath = `http://localhost:${meta.port}/assets/`
} else {
  publicPath = "assets/"
}

entry.push("./lib/index.js")

module.exports = {
  meta,
  plugins,
  entry,

  devtool: "cheap-module-eval-source-map",

  output: {
    path: path.resolve(path.join(__dirname, "public", "assets")),
    filename: "index.js",
    publicPath
  },

  resolve: {
    modulesDirectories: [ "node_modules", "lib" ],
    extensions: [ "", ".js" ]
  },

  postcss: [
    require("postcss-animation")({})
  ],

  module: {
    loaders: [
      {
        test: /\.(css)$/,
        loader: "style!css!postcss"
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file"
      }
    ]
  }
}
