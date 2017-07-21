var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var env = process.env.NODE_ENV
var compress = process.env.COMPRESS
var plugins = []

//node环境变量，生产环境：production，开发环境：development
plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

//代码丑化
if (env === 'production' && compress) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    )
}

plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor'))

plugins.push(new HtmlWebpackPlugin({
    filename: './index.html', //生成的html存放路径，相对于 path
    template: './index.html', //html模板路径
    inject: true, //允许插件修改哪些内容，包括head与body`
}))

module.exports = {
    devtool: 'source-map',
    entry: {
        bundle: ["./index.js", "./assets/styles/index.less"],
        vendor: ["react", 'react-dom', 'mk-meta-engine']
    },

    output: {
        path: path.join(__dirname, "/dist/"),
        filename: '[name].[hash:8].bundle.js',
        chunkFilename: '[name].[hash:8].chunk.js'
    },

    resolve: {
        extensions: [".js"]
    },

    module: {
        rules: [{
            test: /\.css$/,
            exclude: /node_modules/,

            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }]
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader'
            }]
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[hash:8].[ext]',
                }
            }
        }],
    },
    devServer: {
        contentBase: './dist/',
        proxy: {
            '/v1/*': 'http://127.0.0.1:8000/'
        }
    },
    plugins: plugins
}