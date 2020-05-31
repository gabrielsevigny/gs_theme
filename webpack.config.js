const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const autoprefixer = require("autoprefixer");
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    entry: {
        main: './src/js/main.js',
        //vendor: ['node_modules'],
        // style: './src/sass/style.scss',
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'assets/js'),
        chunkFilename: "vendors.bundle.js"
    },
    // externals: {
    //    jquery: 'jQuery',
    //    $: 'jQuery'
    // },
    // context: path.resolve(__dirname, '.' + js.src),


    // plugins: [
        // Adding our UglifyJS plugin
    // ],
    plugins: [
        //Inclus les sources maps des fichiers bundler
        // new webpack.SourceMapDevToolPlugin({
        //     filename: '[file].map',
        //     moduleFilenameTemplate: undefined,
        //     fallbackModuleFilenameTemplate: undefined,
        //     append: null,
        //     module: true,
        //     columns: true,
        //     lineToLine: false,
        //     noSources: false,
        //     namespace: ''
        // }),

        //new UglifyJSPlugin(),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'patate[name].css',
            chunkFilename: 'patate[id].css',
        }),

    ],

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
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],

    },

    //devtool: 'source-map'
    devtool: false
};