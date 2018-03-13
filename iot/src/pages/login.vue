<template>
  <div>
    <!--<header>-->
      <!--<img src="../assets/image/weblogo_x.png" width="40"/>-->
      <!--<span>-->
        <!--中国东信通信平台-->
      <!--</span>-->
    <!--</header>-->
    <main>
      <vue-particles
        class="particles"
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#fff"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
      </vue-particles>
      <div class="login-page" v-show="!issignin">
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
          <div class="login-group">
            <span class="left">没有账号？<a @click="issignin = true">注册</a></span>
            <router-link to="/forgetpsw" class="right">忘记密码？</router-link>
          </div>
          <div class="login-group">
            <!--<button type="button" @click="login">-->
              <!--<span>登录</span>-->
            <!--</button>-->
            <el-button size="mini" @click="login" :disabled="isdisableL">
              <span v-show="!loading">登录<span v-show="iscountL"> {{countL}}s</span></span>
              <i class="el-icon-loading" v-show="loading"></i>
            </el-button>
          </div>
        </form>
      </div>
      <div class="login-page" v-show="issignin">
        <div class="login-group">
          <h3>中国东信物联网平台账号注册</h3>
        </div>
        <form>
          <div class="login-group">
            <!--<input type="text" placeholder="用户名" v-model.trim="username" @blur="checkUser"/>-->
            <div class="login-input">
              <el-input size="small" placeholder="手机号/电子邮箱" v-model.trim="signinForm.username" @blur="checkUser"></el-input>
            </div>
          </div>
          <div class="login-group">
            <!--<input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>-->
            <div class="login-input">
              <el-input size="small" type="password" placeholder="输入密码" v-model.trim="signinForm.password"></el-input>
            </div>
          </div>
          <div class="login-group">
            <!--<input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>-->
            <div class="login-input">
              <el-input size="small" type="password" placeholder="再次输入密码" v-model.trim="signinForm.passwordAgain" @keyup.enter.native="keyEnterSignin"></el-input>
            </div>
          </div>
          <div class="login-group">
            <span class="left">已有账号？<a @click="issignin = false">登录</a></span>
            <!--<a href="#" class="right">忘记密码？</a>-->
          </div>
          <div class="login-group">
            <!--<button type="button" @click="login">-->
              <!--<span>登录</span>-->
            <!--</button>-->
            <el-button size="mini" @click="register" :disabled="isdisableS">
              <span v-show="!loading">注册<span v-show="isdisableS"> {{countS}}s</span></span>
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
          signinForm: {  //注册表单
            username: '',
            password: '',
            passwordAgain: ''
          },
          loading: false,  //默认loading.gif不显示
          issignin: false,  //登录、注册切换，默认false为登录界面
          isdisableL: false,  //禁用登录按钮，默认不禁用
          isdisableS: false,  //禁用注册按钮，默认不禁用
          iscountL: false,
          iscountS: false,
          countL: 5,  //登录倒计时
          countS: 5  //注册倒计时
        }
      },
      methods: {
        checkUser () {
          // let telReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
          // let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          // if (!this.username) {
          //   this.$message.error('您的手机号/电子邮箱不能为空')
          // } else {
          //   if (telReg.test(this.username) || emailReg.test(this.username)) {
          //     return true
          //   } else {
          //     this.$message.error('您的手机号/电子邮箱不符合规格')
          //   }
          // }
          //ajax请求手机号/电子邮箱是否注册过
          this.$message.warning('您的手机号/电子邮箱已注册')
        },
        checkPsw () {
          let pswReg = /^[a-zA-Z0-9]{6,16}$/
          if (!this.password) {
            this.$message.error('您的密码不能为空')
          } else {
            if (!pswReg.test(this.password)) {
              this.$message.error('您的密码只能是6~16位字母和数字')
            } else {
              return true
            }
          }
        },
        login () {
          // this.isdisableL = true  //禁用按钮
          let userObj = {
            param: this.loginForm.username,
            type: 'regexp',
            content: [/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
            msg: '您的手机号/电子邮箱不符合规格',
            paramName: '您的手机号/电子邮箱'
          }
          let pswObj = {
            param: this.loginForm.password,
            type: 'regexp',
            content: [/^[a-zA-Z0-9]{6,16}$/],
            msg: '您的密码只能是6~16位字母和数字',
            paramName: '您的密码'
          }
          if (this.$commom.checkParam(userObj) && this.$commom.checkParam(pswObj)) {
            console.log('准备请求')
            this.countL = null
            this.loading = true  //开始loading
            //ajax请求
            this.loading = false  //取消loading
            this.isdisableL = false  //取消禁用
            this.$router.push('/home')
            this.$commom.clearParam(this.loginForm)
          } else {
            // setTimeout(() => {
            //   this.isdisableL = false
            // }, 5000)
            // this.countL = 5
            // this.iscountL = true
            // let timerLogin = setInterval(() => {
            //   if (this.countL > 0) {
            //     this.countL--
            //   } else {
            //     this.isdisableL = false
            //     this.iscountL = false
            //     clearInterval(timerLogin)
            //   }
            // }, 1000)
            this.keyEnterLogin()
          }
        },
        register () {
          let userObj = {
            param: this.signinForm.username,
            type: 'regexp',
            content: [/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
            msg: '您的手机号/电子邮箱不符合规格',
            paramName: '您的手机号/电子邮箱'
          }
          let pswObj = {
            param: this.signinForm.password,
            type: 'regexp',
            content: [/^[a-zA-Z0-9]{6,16}$/],
            msg: '您的密码只能是6~16位字母和数字',
            paramName: '您的密码'
          }
          if (this.$commom.checkParam(userObj) && this.$commom.checkParam(pswObj)) {
            if (this.signinForm.password === this.signinForm.passwordAgain) {
              this.loading = true
              //ajax请求
              this.loginForm.username = this.signinForm.username
              this.loginForm.password = this.signinForm.password
              this.loading = false
              this.issignin = false
              this.$commom.clearParam(this.signinForm)
              // this.$router.push('/home')
            } else {
              this.$message.error('两次输入密码不一致')
            }
          }
        },
        keyEnterLogin () {
          if (this.flag(this.isdisableL) === true) {
            console.log("keyenter")
            // this.login()
            this.countL = 5
            this.iscountL = true
            this.isdisableL = true
            let timerLogin = setInterval(() => {
              if (this.countL > 0) {
                this.countL--
              } else {
                this.isdisableL = false
                this.iscountL = false
                clearInterval(timerLogin)
              }
            }, 1000)
          }
        },
        keyEnterSignin () {
          if (this.flag(this.isdisableS) === true) {
            console.log("keyenter")
            this.register()
            this.countS = 5
            this.isdisableS = true
            let timerSignin = setInterval(() => {
              if (this.countS > 0) {
                this.countS--
              } else {
                this.isdisableS = false
                clearInterval(timerSignin)
              }
            }, 1000)
          }
        },
        flag(flag) {
          if (flag === true) {
            if (event.keyCode === 13) {
              return false
            }
            return false
          } else {
            return true
          }
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/login.css";
</style>
