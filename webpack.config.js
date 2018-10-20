const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index.js",
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "src/styles/"),
      templates: path.resolve(__dirname, "src/templates/"),
      actions: path.resolve(__dirname, "src/actions/"),
      containers: path.resolve(__dirname, "src/containers/"),
      reducers: path.resolve(__dirname, "src/reducers/")
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    }),
    new MiniCssExtractPlugin()
  ]
};
