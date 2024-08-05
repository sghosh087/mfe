const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        filename: '[name].[contenthash:12].js'
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             exclude: /\.module\.css/,
    //             use: ['style-loader', 'css-loader']
    //         },
    //         {
    //             test: /\.css$/,
    //             include: /\.module\.css/,
    //             use: ['style-loader', {
    //                 loader: 'css-loader',
    //                 options: {
    //                     module: {
    //                         localIdentName: '[path][name]__[local]--[hash:base64:5]'
    //                     }
    //                 }
    //             }]
    //         }
    //     ]
    // }
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        })
    ]
})
