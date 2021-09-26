const path = require('path')
const {resolve} = path
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
   watch: true,
   entry: "./index.pug",
   output: {
       filename: "bundle.js",
       path: path.resolve(__dirname,'build'),
       publicPath: "/"
   },
   devServer: {
        port: 8000,
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
                use: ['babel-loader'],
            },
            {
                test: /\.pug$/,
                use: ['pug-loader'],

            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './index.pug'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new MiniCssExtractPlugin({
      filename: 'css/main.css'
    })
    ],
};