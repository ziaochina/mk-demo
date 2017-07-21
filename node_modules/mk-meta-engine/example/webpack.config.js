var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
    /*new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify('production')
    }),*/
    new HtmlWebpackPlugin({
        filename: './index.html', //生成的html存放路径，相对于 path
        template: './index.html', //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body`
    })
]

if (process.env.COMPRESS) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    );
}

plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor'))

module.exports = {
    devtool: 'source-map',

    entry: {
        bundle: ["./index.js"],
        vendor: ["react", 'react-dom', 'mk-app-loader']
    },

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[name].[hash:8].chunk.js'
    },

    resolve: {
        extensions: [".js"],
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    plugins: plugins
};