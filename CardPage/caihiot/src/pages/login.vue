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
              <el-input size="small" placeholder="用户名" v-model.trim="loginForm.username" autofocus></el-input>
            </div>
          </div>
          <div class="login-group">
            <!--<input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>-->
            <div class="login-input">
              <el-input size="small" type="password" placeholder="密码" v-model.trim="loginForm.password"></el-input>
            </div>
          </div>
          <div class="login-group" style="display: flex;align-items: center">
            <div class="login-input" style="width: 197px;margin-right: 10px">
              <el-input size="small" placeholder="验证码" :maxlength="max" v-model.trim="loginForm.code" @keyup.enter.native="login"></el-input>
            </div>
            <img class="pointer" @click="getCode" :src="imgsrc" width="100" height="40"/>
          </div>
          <div class="login-group">
            <span class="left">没有账号？<a @click="tabSignin">注册</a></span>
            <router-link to="/account/forgetpsw" target="_blank" class="right">忘记密码？</router-link>
          </div>
          <div class="login-group">
            <!--<button type="button" @click="login">-->
              <!--<span>登录</span>-->
            <!--</button>-->
            <el-button class="submit-btn" size="mini" @click="login" :disabled="isdisableL">
              <span v-show="!loading">登录<span v-show="iscountL"> {{countL}}s</span></span>
              <i class="el-icon-loading" v-show="loading"></i>
            </el-button>
          </div>
        </form>
      </div>
      <div class="login-page" v-show="issignin" style="margin-top: -240px">
        <div class="login-group">
          <h3>中国东信物联网平台账号注册</h3>
        </div>
        <form>
          <div class="login-group">
            <!--<input type="text" placeholder="用户名" v-model.trim="username" @blur="checkUser"/>-->
            <div class="login-input">
              <el-input size="small" placeholder="用户名" v-model.trim="signinForm.username"></el-input>
            </div>
          </div>
          <div class="login-group">
            <!--<input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>-->
            <div class="login-input">
              <el-input size="small" type="password" placeholder="密码" v-model.trim="signinForm.password"></el-input>
            </div>
          </div>
          <div class="login-group">
            <!--<input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>-->
            <div class="login-input">
              <el-input size="small" type="password" placeholder="确认密码" v-model.trim="signinForm.passwordAgain"></el-input>
            </div>
          </div>
          <div class="login-group">
            <!--<input type="text" placeholder="用户名" v-model.trim="username" @blur="checkUser"/>-->
            <div class="login-input">
              <el-input size="small" placeholder="手机号码" v-model.trim="signinForm.mobile"></el-input>
            </div>
          </div>
          <div class="login-group">
            <!--<input type="text" placeholder="用户名" v-model.trim="username" @blur="checkUser"/>-->
            <div class="login-input">
              <el-input size="small" placeholder="电子邮箱" v-model.trim="signinForm.email"></el-input>
            </div>
          </div>
          <div class="login-group" style="display: flex;align-items: center">
            <div class="login-input" style="width: 197px;margin-right: 10px">
              <el-input size="small" placeholder="验证码" :maxlength="max" v-model.trim="signinForm.code" @keyup.enter.native="register"></el-input>
            </div>
            <img class="pointer" @click="getCode" :src="imgsrc" width="100" height="40"/>
          </div>
          <div class="login-group">
            <span class="left">已有账号？<a @click="tabLogin">登录</a></span>
            <!--<a href="#" class="right">忘记密码？</a>-->
          </div>
          <div class="login-group">
            <!--<button type="button" @click="login">-->
              <!--<span>登录</span>-->
            <!--</button>-->
            <el-button class="submit-btn" size="mini" @click="register" :disabled="isdisableS">
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
  import md5 from 'js-md5'
    export default {
      name: "login",
      data () {
        return {
          max: 4,
          date: '',
          imgsrc: '',
          loginForm: {  //登录表单
            username: '',
            password: '',
            code: ''
          },
          signinForm: {  //注册表单
            username: '',
            password: '',
            passwordAgain: '',
            mobile: '',
            email: '',
            code: ''
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
      created () {
        this.$commom.clearParam(this.loginForm)
      },
      mounted () {
        this.getCode()
      },
      methods: {
        tabSignin () {
          this.$commom.clearParam(this.signinForm)
          this.issignin = true  //显示注册页面
          this.loading = false  //关闭loading
          this.isdisableS = false
          this.getCode()
        },
        tabLogin () {
          this.$commom.clearParam(this.loginForm)
          this.issignin = false  //显示登录页面
          this.loading = false  //关闭loading
          this.isdisableL = false
          this.getCode()
        },
        login () {
          let userObj = {
            param: this.loginForm.username,
            type: 'regexp',
            content: [/^[a-zA-Z0-9_-]{4,16}$/],
            msg: '您的用户名不符合规格',
            paramName: '您的用户名'
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
            this.isdisableL = true
            this.countL = null
            this.loading = true  //开始loading
            //ajax请求
            this.$ajax({
              method: 'get',
              url: '/vailcode/vail/vailVerify',
              params: {
                date: this.date,
                verify: this.loginForm.code.toLowerCase()
              }
            })
              .then((res) => {
                console.log(res)
                if (res.data.code == '0') {
                  this.$ajax({
                    method: 'post',
                    url: '/caihiot/api-user/user/login',
                    data: {
                      custAccount: this.loginForm.username,
                      custPasswd: md5(this.loginForm.password)
                    }
                  })
                    .then((res) => {
                      console.log(res)
                      if (res.data.code == '0') {
                        this.loading = false  //取消loading
                        this.isdisableL = false  //取消禁用
                        this.$message.success("登录成功")
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("status", res.data.authStatus)
                        this.$router.push('/home')
                      } else {
                        this.$message.error(res.data.msg)
                        this.getCode()
                        this.$commom.clearParam(this.loginForm)
                        this.loading = false  //取消loading
                        this.isdisableL = false  //取消禁用
                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      this.$commom.clearParam(this.loginForm)
                    })
                } else {
                  this.$message.error(res.data.msg)
                  this.getCode()
                  this.loginForm.code = ''
                  this.loading = false  //取消loading
                  this.isdisableL = false  //取消禁用
                }
              })
              .catch((err) => {
                console.log(err)
                this.loginForm.code = ''
              })
          } else {
            this.keyEnterLogin()
            this.$commom.clearParam(this.loginForm)
            this.getCode()
          }
        },
        register () {
          let userObj = {
            param: this.signinForm.username,
            type: 'regexp',
            content: [/^[a-zA-Z0-9_-]{4,16}$/],
            msg: '您的用户名不符合规格',
            paramName: '您的用户名'
          }
          let pswObj = {
            param: this.signinForm.password,
            type: 'regexp',
            content: [/^[a-zA-Z0-9]{6,16}$/],
            msg: '您的密码只能是6~16位字母和数字',
            paramName: '您的密码'
          }
          let mobileObj = {
            param: this.signinForm.mobile,
            type: 'regexp',
            content: [/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/],
            msg: '您的手机号码不符合规格',
            paramName: '您的手机号码'
          }
          let emailObj = {
            param: this.signinForm.email,
            type: 'regexp',
            content: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
            msg: '您的电子邮箱不符合规格',
            paramName: '您的电子邮箱'
          }
          if (this.$commom.checkParam(userObj) && this.$commom.checkParam(pswObj) && this.$commom.checkParam(mobileObj) && this.$commom.checkParam(emailObj)) {
            if (this.signinForm.password === this.signinForm.passwordAgain) {
              this.isdisableS = true
              this.countS = null
              this.loading = true
              //ajax请求
              this.$ajax({
                method: 'get',
                url: '/vailcode/vail/vailVerify',
                params: {
                  date: this.date,
                  verify: this.signinForm.code.toLowerCase()
                }
              })
                .then((res) => {
                  console.log(res)
                  if (res.data.code == '0') {
                    let sendForm = {
                      custAccount: this.signinForm.username,
                      custPasswd: md5(this.signinForm.password),
                      custMobile: this.signinForm.mobile,
                      custMail: this.signinForm.email
                    }
                    console.log('sendForm', sendForm)
                    //发送用户注册请求
                    this.$ajax({
                      method: 'post',
                      url: '/caihiot/api-user/user/register',
                      data: sendForm
                    })
                      .then((res) => {
                        console.log(res)
                        if (res.data.code == '0') {
                          this.$message.success('注册成功')
                          this.getCode()
                          this.loginForm.username = this.signinForm.username
                          this.loading = false
                          this.issignin = false
                          this.isdisableS = false
                        } else {
                          this.$message.error(res.data.msg)
                          this.$commom.clearParam(this.signinForm)
                          this.issignin = true
                          this.loading = false
                          this.isdisableS = false
                        }
                      })
                      .catch((err) => {
                        console.log(err)
                        this.$commom.clearParam(this.signinForm)
                      })
                  } else {
                    this.$message.error(res.data.msg)
                    this.getCode()
                    this.signinForm.code = ''
                    this.issignin = true
                    this.loading = false
                    this.isdisableS = false
                  }
                })
                .catch((err) => {
                  console.log(err)
                  this.signinForm.code = ''
                })
            } else {
              this.$message.error('两次输入密码不一致')
              this.$commom.clearParam(this.signinForm)
              this.getCode()
            }
          } else {
            this.keyEnterSignin()
            this.$commom.clearParam(this.signinForm)
            this.getCode()
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
            console.log("keyenterSogn")
            // this.register()
            this.countS = 5
            this.iscountS = true
            this.isdisableS = true
            let timerSignin = setInterval(() => {
              if (this.countS > 0) {
                this.countS--
              } else {
                this.isdisableS = false
                this.iscountS = false
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
        },
        // 获取验证码
        getCode () {
          this.date = new Date().getTime()
          this.$ajax({
            method: 'get',
            url: '/vailcode/vail/getVerifyImage',
            responseType: 'arraybuffer',
            withCredentials: true,
            params: {
              date: this.date
            }
          })
            .then((res) => {
              console.log(res)
              return 'data:image/jpeg;base64,' + btoa(
                new Uint8Array(res.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              )
            })
            .then(data => {
              console.log(data)
              this.imgsrc = data
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/login.css";
</style>
