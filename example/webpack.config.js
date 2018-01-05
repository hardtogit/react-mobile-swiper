/**
 * Created by dongjiehe on 2017/4/30.
 */
var path=require('path');
var webpack=require('webpack');
var dev=require('./dev');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var app=['babel-polyfill',path.join(__dirname,'./src/index.js')];
var publicPath='/';
var plugins=[];
if (dev[0]=='dev'){
    console.log('s')
    app.push('webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&reload=true&noInfo=false&quiet=false');
    publicPath='http://localhost:3000/build'
    plugins.push(new webpack.HotModuleReplacementPlugin())
}else {
    plugins.push(new HtmlWebpackPlugin({
            inject: true,
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyURLs: true,
                favicon:'/build/favicon.ico'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,  //去掉注释
            compress: {
                warnings: false,
                drop_console: true  //移除console
            }
        }))
}
module.exports={
      entry:{
          app:app
      },
    output:{
          filename:'js/[name].js',
          path:path.join(__dirname,'./build'),
        publicPath:'/',
        chunkFilename:'js/[name][id].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.join(__dirname, 'src')
        ]
    },
    plugins:plugins,
    module:{
          rules:[
              {
                  test:/\.(js|jsx)$/,
                  use:['babel-loader'],
                  include:path.join(__dirname,'./src'),
                  exclude:/node_modules/
              },
              {
                  test: /\.(less|css)$/,
                  use: ["style-loader", "css-loader", "less-loader"]
              },{
                  test: /\.(png|jpg|gif)$/,
                  use: ['file-loader?limit=10000&name=images/[md5:hash:base64:10].[ext]']
              },
              {
                  test: /\.html$/,
                  use:['html-loader?attrs=link:href']
              }
          ]
    }
}