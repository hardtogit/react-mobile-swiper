/**
 * Created by dongjiehe on 2017/4/30.
 */
var dev=require('./dev');
dev.push('pro');
var webpack=require('webpack');
var webpackconfig=require('./webpack.config');
webpack(webpackconfig,function (err) {
    if (err){
        console.log(err)
    }else {
        console.log('build-success')
    }
})