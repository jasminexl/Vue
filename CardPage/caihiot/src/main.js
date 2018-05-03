// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import {Menu, Select, Submenu, Message, MessageBox, Popover, Tag, Input, Button, Form, FormItem, Option, Dialog, DatePicker, MenuItem, RadioGroup, Radio, RadioButton, Table, TableColumn, Loading, Upload, Tabs, TabPane, Pagination, Checkbox} from 'element-ui'
import common from './utils/common'
import date from './utils/date/index'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Select)
Vue.use(Input)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(MenuItem)
Vue.use(RadioButton)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Loading.directive)
Vue.use(Upload)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(VueParticles)
Vue.use(Vuex)
Vue.prototype.$commom = common
Vue.prototype.$date = date
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.config.productionTip = false

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

const ajax = axios.create({
  // transformRequest: [function (data) {
  //   return JSON.stringify(data)
  // }],
  // withCredentials: true
})
//请求拦截器
ajax.interceptors.request.use(function (config) {
  Object.assign(config.headers, {"token": localStorage.getItem("token")})
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$ajax = ajax

const http = axios.create()
http.interceptors.request.use(function (config) {
  Object.assign(config.headers, {"token": localStorage.getItem("token")})
  return config
}, function (error) {
  return Promise.reject(error)
})
http.interceptors.response.use((response) => {
  console.log(response)
  if (response.status === 200) {
    const data = response.data
    // switch (data.code) {
    //   case 118:
    //     this.$message.error('登录信息已过期，请重新登录')
    //     this.$router.push('/')
    //     break
    //   case 119:
    //     this.$message.error('登录信息已过期，请重新登录')
    //     this.$router.push('/')
    //     break
    // }
    if (data.code != '0') {
      this.$message.error(data.msg)
    } else {
      return data
    }
  } else {
    this.$message.error(response.statusText)
  }
}, (error) => {
  return Promise.reject(error)
})
Vue.prototype.$http = http


router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  if (to.meta.required) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      MessageBox.alert('请先登录', '消息')
      next({
        path: '/'
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
  components: { App },
  template: '<App/>',
  data:{
    eventHub: new Vue()   // 在main.js设置所有组件都能用调用
  }
})
