const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js',
        //vendor: ['node_modules'],
        //style: './src/sass/styleScript.js',
    },

    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist/js'),
        chunkFilename: "vendors.bundle.js"
    },

    context: path.resolve(__dirname, '.' + js.src),

    //externals: {
    //    jquery: 'jQuery',
    //    $: 'jQuery'
    //},

    plugins: [
        // Adding our UglifyJS plugin
        new UglifyJSPlugin(),
    ],

    module: {

        rules: [

            {
                test: /\.?js$/,
                exclude: /(node_modules|bower_components|libs)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //cacheDirectory: false,
                        presets: ['@babel/preset-env']
                    }
                }
            },

        ]

    },

    //devtool: 'source-map'
    devtool: false
};