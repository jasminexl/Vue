// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import { Button, Input, Menu, Dialog, Submenu, MenuItem, Tag, Option, MessageBox, Message, Loading, Popover, Table, TableColumn, DatePicker, Radio, RadioGroup, RadioButton, Select, Tabs, TabPane, Pagination, Form, FormItem } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import common from './utils/common'
import date from './utils/date/index'
Vue.use(Button)
Vue.use(Input)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Select)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Tag)
Vue.use(Option)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$messageBox = MessageBox
Vue.prototype.$commom = common
Vue.prototype.$date = date
Vue.config.productionTip = false

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
const ajax = axios.create({
  // transformRequest: [function (data) {
  //   return qs.stringify(data)
  // }],
  // withCredentials: true
})
ajax.interceptors.request.use(function (config) {
  // config.headers.token = localStorage.getItem("token")
  // console.log(config)
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
