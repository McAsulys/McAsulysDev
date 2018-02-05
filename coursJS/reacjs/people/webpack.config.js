const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/main.jsx'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname)
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
};
