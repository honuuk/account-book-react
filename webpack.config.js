const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();

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
    alias: {
      "~": path.resolve(__dirname, "src/"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
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
    new webpack.EnvironmentPlugin([
      "FIREBASE_API_KEY",
      "FIREBASE_AUTH_DOMAIN",
      "FIREBASE_PROJECT_ID",
      "FIREBASE_STORAGE_BUCKET",
      "FIREBASE_MESSAGING_SENDER_ID",
      "FIREBASE_APP_ID",
    ]),
  ],
};
