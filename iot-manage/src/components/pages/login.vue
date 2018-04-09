<template>
    <div>
      <main>
        <div class="login-page">
          <div class="login-group">
            <h3>中国东信物联网平台账号登录</h3>
          </div>
          <form>
            <div class="login-group">
              <!--<input type="text" placeholder="用户名" v-model.trim="username" @blur="checkUser"/>-->
              <div class="login-input">
                <el-input size="small" placeholder="手机号/电子邮箱" v-model.trim="loginForm.username" autofocus></el-input>
              </div>
            </div>
            <div class="login-group">
              <!--<input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>-->
              <div class="login-input">
                <el-input size="small" type="password" placeholder="密码" v-model.trim="loginForm.password" @keyup.enter.native="login"></el-input>
              </div>
            </div>
            <!--<div class="login-group">-->
              <!--<span class="left">没有账号？<a @click="issignin = true">注册</a></span>-->
              <!--<router-link to="/forgetpsw" class="right">忘记密码？</router-link>-->
            <!--</div>-->
            <div class="login-group">
              <!--<button type="button" @click="login">-->
              <!--<span>登录</span>-->
              <!--</button>-->
              <el-button size="mini" @click="login" :disabled="isdisable">
                <span v-show="!loading">登录<span v-show="iscount"> {{count}}s</span></span>
                <i class="el-icon-loading" v-show="loading"></i>
              </el-button>
            </div>
          </form>
        </div>
      </main>
    </div>
</template>

<script>
  export default {
    name: "login",
    data () {
      return {
        loginForm: {  //登录表单
          username: '',
          password: '',
        },
        loading: false,
        isdisable: false,  //禁用登录按钮，默认不禁用
        iscount: false,
        count: 5  //登录倒计时
      }
    },
    methods: {
      login () {
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/login.css";
</style>
