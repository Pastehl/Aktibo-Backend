'use strict'

const path = require("path");
const autoprefixer = require('autoprefixer')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

let pages = ["index", "homepage", "report", "exercise","test","exerciseForms",'dashboard','userMoments'];


module.exports = {
    entry: pages.reduce((config, page) => {
        config[page] = `./src/js/${page}.js`;
        return config;
    }, {}),
    optimization: {
        splitChunks: {
          chunks: "all",
        },
    },
    plugins: [].concat(
        pages.map(
          (page) =>
            new HtmlWebpackPlugin({
              inject: true,
              template: `./src/${page}.html`,
              filename: `${page}.html`,
              chunks: [page],
            })
        ),
        [new NodePolyfillPlugin()],// <- here goes array(s) of other plugins

    ),
    module: {
        rules: [ 
            {
                test: /.html$/,
                use: ["html-loader"]
            },
            {
                test: /.png|svg|jpg|jpeg|gif|mp3/,
                type: 'asset/resource'
            },
            {
                test: /\.(scss)$/,
                use: [
                {
                    // Adds CSS to the DOM by injecting a `<style>` tag
                    loader: 'style-loader'
                },
                {
                    // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                },
                {
                    // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                    postcssOptions: {
                        plugins: [
                        autoprefixer
                        ]
                    }
                    }
                },
                {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                }
                ]
            }
        ]
    },
    experiments: {
        topLevelAwait: true
    },
    externals: {
        // only define the dependencie  s you are NOT using as externals!
        canvg: "canvg",
        html2canvas: "html2canvas",
        dompurify: "dompurify"
    }
}
