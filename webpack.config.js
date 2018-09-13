const path = require('path');
const Config = require('webpack-chain');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = new Config();

config
    .entry('index')
    .add('./src/index.js')
    .end()
    .output
    .path(path.resolve(__dirname, 'dist'))
    .filename('[name].js');

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
    });

config.module.rule("css")
    .test(/\.(sass|css)$/)
    .use("mini").loader(MiniCssExtractPlugin.loader).end()
    //.use("style").loader("style-loader").end()
    .use("css").loader("css-loader").end().use("sass").loader("sass-loader").end()
    // .use("postcss").loader("postcss-loader").options({
    //     sourceMap: false
    // });

config.externals({
    "moment": "moment"
});

config.plugin("css").use(
    new MiniCssExtractPlugin({
        filename: "[name].css"
    })
)

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig();