const path = require('path');
const webpack = require('webpack');
const debug = true;

module.exports = {
    entry: './src/index',
    output: {
        filename: 'scripts.js',
        path: path.resolve(__dirname, 'src')
    },
    watch: debug,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: debug ? "cheap-inline-module-source-map" : null,
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
};

if (!debug) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    );
}