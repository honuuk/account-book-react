const WebpackPwaManifest = require("webpack-pwa-manifest");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const mode = process.env.STAGE || "development";

module.exports = {
  mode,
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
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
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.EnvironmentPlugin([
      "FIREBASE_API_KEY",
      "FIREBASE_AUTH_DOMAIN",
      "FIREBASE_PROJECT_ID",
      "FIREBASE_STORAGE_BUCKET",
      "FIREBASE_MESSAGING_SENDER_ID",
      "FIREBASE_APP_ID",
    ]),
    new WebpackPwaManifest({
      name: "가계부",
      short_name: "가계부",
      description: "우리집 가계부",
      background_color: "#ffffff",
      crossorigin: "use-credentials",
      publicPath: "/",
      start_url: ".",
      icons: [
        {
          src: path.resolve("./src/assets/icon.png"),
          sizes: [96, 120, 128, 180, 192, 256, 384, 512], // multiple sizes
        },
      ],
    }),
    ...(mode === "development"
      ? [new webpack.HotModuleReplacementPlugin()]
      : []),
  ],
};
