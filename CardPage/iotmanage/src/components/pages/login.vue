<template>
    <div class="page">
      <div class="myheader">
        <div class="header-content">
          <div class="header-logo" style="cursor: default">
            <img src="../../assets/image/weblogo_x.png" width="40"/>
            <span>订单管理系统管理平台</span>
          </div>
        </div>
      </div>
      <main>
        <div class="login-page" v-show="!issignin">
          <div class="login-group">
            <h3>登录</h3>
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
                <el-input size="small" type="password" placeholder="密码" v-model.trim="loginForm.password" @keyup.enter.native="login"></el-input>
              </div>
            </div>
            <div class="login-group">
              <span class="left">没有账号？<a @click="tabSignin">注册</a></span>
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
        <div class="login-page" v-show="issignin" style="margin-top: -236px">
          <!--<div class="login-group">-->
            <!--<h3>注册</h3>-->
          <!--</div>-->
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
                <el-input size="small" placeholder="真实姓名" v-model.trim="signinForm.name"></el-input>
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
                <el-input size="small" placeholder="电子邮箱" v-model.trim="signinForm.email" @keyup.enter.native="register"></el-input>
              </div>
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
        loginForm: {  //登录表单
          username: '',
          password: '',
        },
        signinForm: {  //注册表单
          username: '',
          password: '',
          passwordAgain: '',
          name: '',
          mobile: '',
          email: ''
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
      tabSignin () {
        this.$commom.clearParam(this.signinForm)
        this.issignin = true  //显示注册页面
        this.loading = false  //关闭loading
        this.isdisableS = false
      },
      tabLogin () {
        this.$commom.clearParam(this.loginForm)
        this.issignin = false  //显示登录页面
        this.loading = false  //关闭loading
        this.isdisableL = false
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
          let sendData = {
            account: this.loginForm.username,
            password: md5(this.loginForm.password)
          }
          this.$ajax.get("/caihiot/api-admin/admin/login", {
            params: sendData
          })
            .then((res) => {
              console.log(res.data)
              if (res.data.code == "0") {
                this.$message.success("管理员登录成功！")
                localStorage.setItem("token", res.data.token)
                this.$router.push('/home')
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.keyEnterLogin()
          this.$commom.clearParam(this.loginForm)
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
            let sendData = {
              account: this.signinForm.username,
              password: md5(this.signinForm.password),
              name: this.signinForm.name,
              mobile: this.signinForm.mobile,
              email: this.signinForm.email
            }
            this.$ajax.post("/caihiot/api-admin/admin/register", sendData)
              .then((res) => {
                console.log(res.data)
                if (res.data.code == "0") {
                  this.$message.success("管理员注册成功！")
                  this.loginForm.username = this.signinForm.username
                  this.issignin = false
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            this.$message.error('两次输入密码不一致')
            this.$commom.clearParam(this.signinForm)
          }
        } else {
          this.keyEnterSignin()
          this.$commom.clearParam(this.signinForm)
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
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/login.css";
  @import "../../assets/css/header.css";
  .page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #F5F5F5 url("../../assets/image/rebc.gif");
  }
</style>
