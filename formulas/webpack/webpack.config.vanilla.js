"use strict";

const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: path.join(__dirname, "src", "index.js"),
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, "src"),
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: "babel_cache",
            presets: ["@babel/env"],
          },
        },
      }
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    })
  ],
};
