const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        })
    ]
}

module.exports = common