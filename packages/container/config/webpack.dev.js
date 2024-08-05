const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packgeJson = require('../package.json');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
        // static: {
        //     directory: path.join(__dirname, '../dist'),
        // },
        historyApiFallback: {
            index: 'index.html'
        },
        liveReload: false
        // devMiddleware: {
        //     index: true,
        //     writeToDisk: true
        // }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.css$/,
                include: /\.module\.css/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        module: {
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                }]
            }
        ]
    },

    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                'marketing': 'marketing@http://localhost:8081/remoteEntry.js'
            },
            // shared: ['react', 'react-dom']
            shared: packgeJson.dependencies
        })
    ]
})

