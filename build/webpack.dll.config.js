const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: {
    vendor: ['vue',
            'vue-router',
            'axios',  
            'vuex',
            'echarts'
          ]
  },
  output: {
    path: path.join(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'       // vendor.dll.js中暴露出的全局变量名
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/js', '[name]-manifest.json'),
      name: '[name]_library'
    }),
  ]
};