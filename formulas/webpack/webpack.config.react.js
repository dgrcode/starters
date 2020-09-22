"use strict";

const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJsPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const extractSass = new MiniCssExtractPlugin({ filename: "[name].css" });

module.exports = {
  optimization: {
    minimizer: [new TerserJsPlugin({}), new OptimizeCssAssetsPlugin({})],
  },
  mode: "production",
  entry: {
    index: path.join(__dirname, "src", "index.jsx"),
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
        exclude: /\.scss$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: "babel_cache",
            presets: ["@babel/react", "@babel/env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    extractSass,
  ],
};
