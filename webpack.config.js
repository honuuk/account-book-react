const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  devServer: {
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  entry: {
    app: path.join(__dirname, "/src/index.tsx"),
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
    ],
  },

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
