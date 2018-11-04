const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WebpackChain = require('webpack-chain');

const config = new WebpackChain();

config.when(isProd,config=>{
    config.entry('index').add('./src/index.js');
}).when(!isProd,config=>{
    config.entry('index').add('./example/index.js');
})
// Modify output settings
.output
    .path(path.join(__dirname, "dist")).filename('[name].js').end()
    .when(isProd, config => {
        //libraryTarget 配置以何种方式导出库。
        //output.library 配置导出库的名称。
    config.mode('production').output.library("bulmaDatetime").libraryTarget("umd").umdNamedDefine(true);
}).when(!isProd,config=>{
    config.mode('development').devtool('source-map');
}).end();

/**
 * module
 */
config
    .module
    .rule("compile")
    .test(/\.js$/)
    .include.add(path.join(__dirname,'src')).end()
    .exclude.add(/node_modules/).end()
    .use('babel').loader("babel-loader")
    .options({
        presets: ['@babel/preset-env'],
        plugins: [require('@babel/plugin-proposal-class-properties')]
    });

config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
        limit: 4096,
        name: "images/[name].[ext]"
    })

// do not base64-inline SVGs.
// https://github.com/facebookincubator/create-react-app/pull/1180
config.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
        limit: 1024 * 3,//30kb
        fallback: 'file-loader'
    })

config.module
    .rule("fonts")
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
    .loader('url-loader')
    .options({
        limit: 4096,
        fallback: {
            loader: 'file-loader',
            options: {
                name: "fonts/[name].[ext]"
            }
        }
    });

config.when(isProd,config=>{
    config.module.rule("css").test(/\.(sa|sc|c)ss$/).use("style").loader(MiniCssExtractPlugin.loader,[{
        options: {
            publicPath: './'
        }
    }]);
}).when(!isProd,config=>{
    config.module.rule("css").test(/\.(sa|sc|c)ss$/).use("style-loader").loader("style-loader").options({sourceMap:false});
})

config.module.rule("style").test(/\.(sa|sc|c)ss$/).use("css-loader").loader("css-loader")
    .options({
        sourceMap: false,
        importLoaders: 1,
        modules: false,
    }).end()
    .use('postcss-loader')
    .loader('postcss-loader').options({
        sourceMap: false
    });


config.module.rule("scss").test(/\.scss$/).use("scss-loader").loader("sass-loader").options({
    sourceMap: false
});
config.module.rule("sass").test(/\.sass$/).use("sass-loader").loader("sass-loader").options({
    sourceMap: false,
    indentedSyntax: true
});

/**
 * plugin
 */
config.when(isProd,config=>{
    const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    const CopyWebpackPlugin = require("copy-webpack-plugin");
    config.plugin("js").use(new UglifyJSPlugin());
    config.optimization.minimize(true);
    config.plugin('extract-css')
        .use(MiniCssExtractPlugin, [{
            filename: "css/[name].css",
            chunkFilename: "css/[name].css"
        }]);
    config.plugin('copy').use(new CopyWebpackPlugin([
        {
            from:"./src/sass",
        }
    ]))
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    config.plugin("clear").use(new CleanWebpackPlugin([path.join(__dirname, 'dist')]));
}).when(!isProd,config=>{
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    config.plugin("html").use(HtmlWebpackPlugin, [{
        /*
         template 参数指定入口 html 文件路径，插件会把这个文件交给 webpack 去编译，
         webpack 按照正常流程，找到 loaders 中 test 条件匹配的 loader 来编译，那么这里 html-loader 就是匹配的 loader
         html-loader 编译后产生的字符串，会由 html-webpack-plugin 储存为 html 文件到输出目录，默认文件名为 index.html
         可以通过 filename 参数指定输出的文件名
         html-webpack-plugin 也可以不指定 template 参数，它会使用默认的 html 模板。
         */
        template: "./index.html",
        /*
         因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
         https://github.com/jantimon/html-webpack-plugin/issues/870
         */
        chunksSortMode: 'none',
        xhtml: true,
        minify: {
            collapseWhitespace: true, //删除空格，但是不会删除SCRIPT、style和textarea中的空格
            conservativeCollapse: false, //删除空格，总是保留一个空格
            removeAttributeQuotes: false, //删除引号，删除不需要引号的值
            useShortDoctype: false, //使用短的文档类型
            removeComments: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        }
    }]);
})

config.when(isProd,config=>{
    config.externals({
        "moment": "moment"
    });
}).when(!isProd,config=>{
    config.devServer.host('localhost').port(8080).open(process.os === 'darwin');
})

config.resolve.alias.set("@",path.join(__dirname,"src"));

// Export the completed configuration object to be consumed by webpack
module.exports = config.toConfig();