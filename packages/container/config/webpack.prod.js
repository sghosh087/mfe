const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: '[name][contenthash:12].js'
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
    }
})

module.exports = common