const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const pageOptions = {
    /*minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },*/
    hash: true,
    template: path.resolve(__dirname, 'src/assets/templates/main.html')
}

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        /*****************************************************
         * Pages
         *****************************************************/
        new HtmlWebpackPlugin(Object.assign(pageOptions, {
            filename: 'index.html',
            title: 'Home',
            page: 'index.html'
        })),
        new HtmlWebpackPlugin(Object.assign(pageOptions, {
            filename: 'about.html',
            title: 'About',
            page: 'about.html'
        })),

        new MiniCssExtractPlugin()
    ]
}