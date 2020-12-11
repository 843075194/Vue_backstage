import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

import axios from 'axios'
// 配置请求的根路径,也就是说所有的路由都是以这个为一级路由开始的
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在挂载之前先设置一下拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  // 根据接口文档，给请求头中添加这个Authorization属性，值是token的值
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})
// 将axios这个包挂载到Vue原型对象里
Vue.prototype.$http = axios
// 这样配置完之后每一个地方都可以用this.$http去访问axios然后发起请求

Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
