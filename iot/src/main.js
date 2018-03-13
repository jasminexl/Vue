// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Menu, Select, Submenu, Message, Input, Button, Form, FormItem, Option, Dialog, DatePicker, MenuItem, RadioGroup, Radio, RadioButton, Table, TableColumn, Loading, Upload, Tabs, TabPane, Pagination, Checkbox} from 'element-ui'
import common from './utils/common'
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
Vue.prototype.$commom = common
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
