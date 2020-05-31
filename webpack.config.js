const path = require('path');

//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    entry: {
        main: './src/js/main.js',
        //vendor: ['node_modules'],
        //style: './src/sass/styleScript.js',
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'assets/js'),
        chunkFilename: "vendors.bundle.js"
    },
    externals: {
       jquery: 'jQuery',
       $: 'jQuery'
    },

    // context: path.resolve(__dirname, '.' + js.src),


    // plugins: [
        // Adding our UglifyJS plugin
        //new UglifyJSPlugin(),
    // ],

    optimization: {
        splitChunks: { //Permets d'importer des librairies nodes si utilisé dans le projet afin d'éviter de les avoir dans plus d'un bundle
            cacheGroups: {
                node_vendors: {
                    test: /[\\/]node_modules|libs[\\/]/,
                        chunks: 'all',
                        priority: 1,
                },
            },
            chunks(chunk) {
                return chunk.name
            }
        }
    },
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