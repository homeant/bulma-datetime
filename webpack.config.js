const path = require('path');
const Config = require('webpack-chain');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const PreloadWebpackPlugin  = require("preload-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin");


const config = new Config();

config.when(process.env.NODE_ENV === 'development',config =>{
    config.devtool("source-map");
    config
        .entry('demo')
        .add('./src/demo/index.js')
        .end()
        .output
        .path(path.resolve(__dirname, 'dist'))
        .filename('[name].js');
})

config.when(process.env.NODE_ENV === 'production',config =>{
    config
        .entry('index')
        .add('./src/index.js')
        .end()
        .output
        .path(path.resolve(__dirname, 'dist')).library("bulmaDatetime").libraryTarget("umd").umdNamedDefine(true)
        .filename('[name].js');
})

config.module
    .rule('compile')
    .test(/\.js$/)
    .include
    .add('src')
    .end()
    .use('babel')
    .loader('babel-loader')
    .options({
        plugins: ['syntax-dynamic-import'],
        presets: [
            'env',
            {
                modules: false
            }
        ]
    })


config.module.rule('sass').test(/\.sass$/).use("mini").loader(MiniCssExtractPlugin.loader).end()
    .use("css").loader("css-loader").end()
    .use("sass").loader("sass-loader").end();


config.plugin('html-index').use(new HtmlWebpackPlugin({
    template: "index.html",
    filename: "index.html",
    chunks: ["demo","index"]//按需引入对应名字的js文件
}));

//config.plugin('preload-index').use(new PreloadWebpackPlugin());

config.plugin("extract-css").use(
    new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: 'css/[name].css'
    })
)

config.plugin('copy').use(new CopyWebpackPlugin([
    {
        from:"./src/sass",
    }
]))




config.when(process.env.NODE_ENV === 'development', config => {
    config.plugin("define").use(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "development"
            }
        })
    );
});

config.when(process.env.NODE_ENV === 'production', config => {
    config.externals({
        "moment": "moment"
    });
    config.plugin("define").use(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "production"
            }
        })
    );
});

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig();