// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'
import {Menu, Select, Submenu, Message, MessageBox, Input, Button, Form, FormItem, Option, Dialog, DatePicker, MenuItem, RadioGroup, Radio, RadioButton, Table, TableColumn, Loading, Upload, Tabs, TabPane, Pagination, Checkbox} from 'element-ui'
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
// Vue.use(Message)
// Vue.component(Message.name, Message)
Vue.use(VueParticles)
Vue.use(Vuex)
Vue.prototype.$commom = common
Vue.prototype.$date = date
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.config.productionTip = false

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
  // .post['Content-Type'] = 'application/json; charset=UTF-8';
const ajax = axios.create({
  // transformRequest: [function (data) {
  //   return JSON.stringify(data)
  // }],
  // withCredentials: true
})
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });
ajax.interceptors.request.use(function (config) {
  // config.headers.token = localStorage.getItem("token")
  // console.log(config)
  Object.assign(config.headers, {"token": localStorage.getItem("token")})
  return config
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$ajax = ajax

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
