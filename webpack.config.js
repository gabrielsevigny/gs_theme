//TODO: AJOUTER LA POSSIBILITÉ D'AJOUTER ./LIBS dans vendors.js
//TODO: Compression des images

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //A VOIR
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const CopyPlugin = require('copy-webpack-plugin');

const $proxy = 'https://cliniquedentaire:8890/';

module.exports = {
    context: __dirname,
    entry: {
        main: [
            './src/js/main.js',
            './src/scss/style.scss',
        ]
    },

    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'assets/js'),
        chunkFilename: 'vendors.bundle.js'
    },

    externals: {
        jquery: 'jQuery',
        $: 'jQuery'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                exclude: /node_modules/,
                test: /\.jsx$/
                //loader: 'eslint-loader'
            },
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
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../css/[name].css'
                        }
                    },
                    'extract-loader',
                    // MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../css/[name].css'
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: 'svg-defs.svg'
                }
            },
            {
                test: /\.(jpe?g|png|gif)\$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/',
                            name: '[name].[ext]'
                        }
                    },
                    'img-loader'
                ]
            }
        ]
    },

    plugins: [
        // new StyleLintPlugin(),
        // new MiniCssExtractPlugin(),
        //new DashboardPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.AutomaticPrefetchPlugin(),

        /**
         * Plugin pour copieCollie les directory etc
         */
        new CopyPlugin({
            patterns: [
                /**
                 * Exporte les images
                 */
                {
                    from: path.resolve(__dirname, 'src/images/'),
                    to: path.resolve(__dirname, 'assets/images/'),
                    force: true,
                }
            ],
        }),
        //Compression des images

        //TODO: À vérifier pour optimisation
        /*new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            //test: path.resolve(__dirname, '**!/!*.(jpe?g|png|gif|svg)'),
            optipng: {optimizationLevel: 9},
            gifsicle: {optimizationLevel: 9},
            jpegtran: {optimizationLevel: 9},
            svgo: {optimizationLevel: 9},
            context: path.resolve(__dirname, 'src/images/'),
            destination: path.resolve(__dirname, 'assets/images'),
        }),*/

        new BrowserSyncPlugin({
            files: '**/*.(php|poe|css|scss|js|html)',
            injectChanges: true,
            proxy: {
                target: $proxy,
                ws: true
            },
            notify: false,
            //open: "external",

        }),

        //notifications
        new WebpackNotifierPlugin({
            title: 'Le projet a été mis a jour',
            //contentImage: path.join(__dirname, 'src/js_icon.png'),
            contentImage: false,
            sound: 'Pop', // true, false, Sound can be one of these: Basso, Blow, Bottle, Frog, Funk, Glass, Hero, Morse, Ping, Pop, Purr, Sosumi, Submarine, Tink
            //open: 'https://gabrielsevigny.com', //URL vers la redirection doit allez
            // icon: path.join(__dirname, 'src/js_icon.png')
            icon: false
        }),

        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8
        }),

    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        //minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin()]
    },

    performance: {
        hints: false //-> Given an asset is created that is over 250kb:
        // hints: 'warning' //-> No hint warnings or errors are shown.
        //hints: 'error' //-> A warning will be displayed notifying you of a large asset. We recommend something like this for development environments.
    },


    //devtool: 'source-map'
    //devtool: 'cheap-eval-source-map'
    devtool: false,

};