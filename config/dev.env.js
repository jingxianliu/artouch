'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//本地环境地址
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API:'"http://10.10.6.50:3000/api/obs"',
 
})


