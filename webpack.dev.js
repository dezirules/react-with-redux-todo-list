const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {

    devtool: 'cheap-module-source-map',

    devServer: {
        contentBase: './src',
        hot: true,
        inline: true
    },

    mode: 'development',

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});