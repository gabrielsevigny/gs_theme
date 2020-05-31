const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

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

        //new WebpackBuildNotifierPlugin({
        //    title: "WebPack Build",
        //   icon: false, // Absolute path (doesn't work on balloons)
        //   suppressSuccess: false
        //})

        new WebpackNotifierPlugin({
            title: 'My awesome title',
            //contentImage: path.join(__dirname, 'src/js_icon.png'),
            contentImage: false,
            sound: 'Pop', // true, false, Sound can be one of these: Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
            open: 'https://gabrielsevigny.com', //URL vers la redirection doit allez
            icon: path.join(__dirname, 'src/js_icon.png'),
        })

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