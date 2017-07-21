var webpack = require("webpack");
var path = require("path");
var env = process.env.NODE_ENV
var compress = process.env.COMPRESS

var plugins = []

plugins.push(new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(env)
}))

if (env === 'production' && compress) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    )
}

module.exports = {
    entry: ["./src/index.js"],

    output: {
        path: path.join(__dirname, "/dist/"),
        library: "MKAppLoader",
        libraryTarget: "umd"
    },

    resolve: {
        extensions: [".js"]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDom",
        "redux": "Redux",
        "react-redux": "ReactRedux",
        "immutable": 'Immutable'
    },

    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },

    plugins: plugins
}

if (env === 'development') {
    module.exports.devtool = 'source-map'
}
