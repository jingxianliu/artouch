// The Vue build version to load with the `import` command

import Vue from 'vue'
import App from './App.vue'


//element样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


//自定义公用样式
import './assets/css/common.css'

//路由
import Router from 'vue-router'
import router from './router'

//重写push方法
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

//过滤器
import * as filters from './utils/filters'
//API
import * as API from './utils/api'



import { get, post ,put ,deletes,upload} from './utils/axios'

import axios from 'axios'
//vuex
import store from './store'



//剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import GL_Components from './components/components'
Vue.use(GL_Components)


//echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts





Vue.config.productionTip = false

//配置公共请求地址
Vue.prototype.$API = API



Vue.prototype.$axios = axios




Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$put = put
Vue.prototype.$delete = deletes

// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})



router.beforeEach((to, from, next) => {
  if(to.path === "/home" ){
    let loginName =  store.state.loginName
      if( loginName){       
        next();
      }else{
        router.push("/")
      }  
   
  }else{
    
    store.commit('deletePending') // 取消请求
    next();
  }
  
  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')
 
