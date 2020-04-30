"use strict";
const fs = require("fs");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-sourcemap",
  entry: {
    index: path.join(__dirname, "src", "index.jsx"),
  },
  devServer: {
    inline: true,
    hot: true,
    compress: true,
    // add host if needed
    port: 3334, // could be a different port
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, "src"),
        exclude: /\.sass$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: "babel_cache",
            presets: ["@babel/react", "@babel/env"],
          },
        },
      },
      {
        test: /\.sass$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
  ],
};
