// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Vuex from 'vuex'
import store from './vuex/store'
import axios from 'axios'
import qs from 'qs'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import utils from './utils/index'
import 'babel-polyfill'

// 本地数据
const ms = axios.create({
  transformRequest: [function (data) {
    return qs.stringify(data)
  }]
})
Vue.prototype.$http = ms

// 渠道开放平台
const other = axios.create({
  transformRequest: [function (data) {
    return qs.stringify(data)
  }],
  withCredentials: true
})
// 拦截器
other.interceptors.response.use(
  response => {
    console.log(response)
    console.log('响应状态码' + response.status)
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 423:
          console.log('拦截器423')
          alert('您未登录或登录超时！请登录！')
          router.replace({
            path: '/login'
          })
          break
      }
    }
    return Promise.reject(error.response.data)
  }
)
Vue.prototype.$ajax = other

Vue.prototype.$utils = utils
Vue.use(Vuex)
Vue.use(ElementUi)
Vue.config.productionTip = false

// cookies
function setCookies (name, value, expires) {
  let d = new Date()
  d.setTime(d.getTime() + 60 * 1000 * expires)
  window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}
function getCookies (name) {
  let reg = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return reg ? reg[2] : null
}
function deleteCookies (name) {
  this.setCookies(name, '', -1)
}
Vue.prototype.setCookies = setCookies
Vue.prototype.getCookies = getCookies
Vue.prototype.deleteCookies = deleteCookies

router.beforeEach((to, from, next) => {
  let cookie = getCookies('username')
  if (to.meta.requireAuth) {
    console.log('route钩子函数-store' + store.islogin)
    console.log(cookie)
    if (cookie) {
      next()
    } else {
      alert('请先登录！')
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App)
})
