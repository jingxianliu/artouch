'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpack = require('webpack')
const HappyPack = require('happypack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // externals: {
  //   'vue': 'Vue',
  //   'vue-router': 'VueRouter',
  //   'vuex': 'Vuex',
  //   'axios': 'axios',
  //   'echarts': 'echarts'
  // },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2
        }
    }
  }
},

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },

      //Does the latest version of vue-loader 15.1 support happypack #1339

      // {
      //   test: /\.vue$/,
      //   loader: 'happypack/loader?id=vue',
      // },
    
      {
        test: /\.js$/,
       // loader: 'babel-loader',
       //把对.js文件的处理交给id为babel的HappyPack实例
        use:['happypack/loader?id=babel'],
        include: [resolve('src'), resolve('test')],
        //派出node_modules目录下的文件（都是用ES5语法，没必要转换）
        exclude:path.resolve(__dirname,'node_modules')
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
         appendTsSuffixTo: [/\.vue$/],
        }
      },    
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
      	test: /\.swf$/, //此处添加视频组件的.swf文件编译
      	loader: 'url-loader',
      	options:{
 					limit: 10000
				}
      },
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new VueLoaderPlugin(),
    
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: path.resolve(__dirname, '../static/js', 'vendor-manifest.json')
    }),
    new HappyPack({
      id:'babel',
      loaders:['babel-loader?cacheDirectory']
    }),
    // new HappyPack({
    //   id:'vue',
    //   loaders:[
    //     {
    //       loader:'vue-loader',
    //       cacheDirectory:true,
    //       option:vueLoaderConfig
    //     }
    //   ]
    // }),
    
    // new UglifyJsPlugin({
    //   uglifyOptions:{
    //       compress:{
    //       warnings: false,
    //       }
    //   },
    //   sourceMap: false,
    //   parallel: true , // 并行处理打包文件
    //   cache: true, // 使用缓存
    // })


  ]
}
