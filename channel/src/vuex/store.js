import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: '用户',
    islogin: false,
    userid: ''
  },
  mutations: {
    // 更新用户名
    newUsername (state, msg) {
      state.username = msg
    },
    // 更新登录状态
    isLogin (state, islogin) {
      this.islogin = islogin
    },
    // 保存用户ID
    updateId (state, userid) {
      this.userid = userid
    }
  }
})

export default store
