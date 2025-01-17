const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

module.exports = merge(commonConfig, {
    mode: "production",
    output: {
        filename: '[name].[contenthash:12].js',
        publicPath: '/container/latest/'
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
    // },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        }),

    ]
})
