const path = require('path')
const {resolve} = path
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
  watch: true,
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".json", ".pug", ".scss"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|png)$/,
        type: "asset/inline",
      },

      {
        test: /\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,

          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      template: path.resolve(__dirname, "/src/index.pug"), // шаблон
      filename: "index.html", // название выходного файла
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/src/images`,
          to: "images",
          noErrorOnMissing: true,
        },
        {
          from: `${__dirname}/src/assets/fonts`,
          to: "fonts",
          noErrorOnMissing: true,
        },
        {
          from: `${__dirname}/src/assets/pictures`,
          to: "pictures",
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};