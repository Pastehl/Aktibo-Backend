const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new TerserPlugin(),
            // new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename:"[name].[contenthash].css"}), 
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    }
});