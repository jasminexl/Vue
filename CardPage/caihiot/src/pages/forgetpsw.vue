<template>
    <div>
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
        <div class="login-page" v-show="pager === 1">
          <div class="login-group">
            <h3>忘记密码</h3>
          </div>
          <div class="login-group">
            <div class="login-input">
              <span style="color: #8590a6">验证码将会发送至您注册时绑定的手机或邮箱</span>
            </div>
          </div>
          <!--<form>-->
            <div class="login-group">
              <div class="login-input">
                <el-input size="small" placeholder="用户名" v-model.trim="forgetForm.username"></el-input>
              </div>
            </div>
            <div class="login-group">
              <div class="login-input">
                <el-input size="small" placeholder="手机号码或电子邮箱" v-model.trim="forgetForm.sendAddress" @keyup.enter.native="sendCode"></el-input>
              </div>
            </div>
            <div class="login-group">
              <el-button class="submit-btn" size="mini" @click="sendCode">
                <span v-show="!loading">下一步</span>
                <i class="el-icon-loading" v-show="loading"></i>
              </el-button>
            </div>
          <!--</form>-->
        </div>
        <div class="login-page" v-show="pager === 2">
          <div class="login-group">
            <h3>忘记密码</h3>
          </div>
          <div class="login-group">
            <div class="login-input">
              <span style="color: #8590a6">验证码已发送至你的注册邮箱或手机</span>
            </div>
          </div>
          <!--<form>-->
            <div class="login-group">
              <div class="login-input" style="text-align: left">
                  <span class="login-span">
                    注册用户名：
                    {{forgetForm.username}}
                  </span>
              </div>
            </div>
            <div class="login-group">
              <div class="login-input" style="text-align: left">
                <span class="login-span">
                  <span v-if="ismobile">注册手机号：</span>
                  <span v-else>注册邮箱：</span>
                  {{forgetForm.sendAddress}}
                </span>
              </div>
            </div>
            <div class="login-group" style="display: flex;align-items: center">
              <div class="login-input" style="width: 170px;margin-right: 8px">
                <el-input size="small" placeholder="6位验证码" :maxlength="codelen" v-model.trim="forgetForm.code" @keyup.enter.native="vailMailCode"></el-input>
              </div>
              <el-button type="text" :disabled="iscount" size="small" @click="sendCode" style="width: 129px;font-size: 13px">
                <span v-show="iscount">{{count}}s后</span>
                重新获取验证码
              </el-button>
            </div>
            <div class="login-group">
              <el-button class="submit-btn" size="mini" @click="vailMailCode">
                <span v-show="!loading">下一步</span>
                <i class="el-icon-loading" v-show="loading"></i>
              </el-button>
            </div>
          <!--</form>-->
        </div>
        <div class="login-page" v-show="pager === 3">
          <div class="login-group">
            <h3>设置新密码</h3>
          </div>
          <!--<form>-->
            <div class="login-group">
              <div class="login-input">
                <el-input size="small" type="password" placeholder="新密码" v-model.trim="forgetForm.password"></el-input>
              </div>
            </div>
            <div class="login-group">
              <div class="login-input">
                <el-input size="small" type="password" placeholder="再次输入新密码" v-model.trim="forgetForm.passwordAgain" @keyup.enter.native="resetPsw"></el-input>
              </div>
            </div>
            <div class="login-group">
              <el-button class="submit-btn" size="mini" @click="resetPsw">
                <span v-show="!loading">重置密码</span>
                <i class="el-icon-loading" v-show="loading"></i>
              </el-button>
            </div>
          <!--</form>-->
        </div>
      </main>
    </div>
</template>

<script>
  import md5 from 'js-md5'
  export default {
    name: "forgetpsw",
    data () {
      return {
        pager: 1,
        codelen: 6,
        loading: false,  //按钮loading
        // showfound: true,  //true显示输入账号页面，反之显示输入验证码页面
        // isreset: false,  //false显示输入账户和验证码页面，true显示重置密码页面
        ismobile: null,  //是否为手机号，将传给后端
        count: null,  //获取验证码倒数60s
        iscount: null,  //显示验证码倒数
        imgsrc: '',
        forgetForm: {
          username: '',
          sendAddress: '',
          date: '',
          code: '',
          password: '',
          passwordAgain: ''
        },
        uid: null  //从sendcode方法获取，在resetPsw方法传给后端
      }
    },
    mounted () {
      // this.getCode()
    },
    methods: {
      //发送验证码
      sendCode () {
        if (this.forgetForm.username) {
          let mobileReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
          let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
          //  账号是手机号
          if (mobileReg.test(this.forgetForm.sendAddress)) {
            this.ismobile = true
            this.$ajax.get("/forgetpass/forgetpsw/sendcode", {
              params: {
                custAccount: this.forgetForm.username,
                custMobile: this.forgetForm.sendAddress,
                ismobile: this.ismobile
              }
            })
              .then((res) => {
                console.log(res)
                if (res.data.code == '0') {
                  this.$message.success("发送验证码成功，请注意查收")
                  this.uid = res.data.id
                  this.showfound = false  //显示输入验证码页面
                  this.pager = 2
                  this.countDown()
                } else {
                  this.$message.error(res.data.msg)
                  this.forgetForm.username = ''
                  this.forgetForm.sendAddress = ''
                }
              })
              .catch((err) => {
                console.log(err)
                this.forgetForm.username = ''
                this.forgetForm.sendAddress = ''
              })
          //  账户是邮箱
          } else if (emailReg.test(this.forgetForm.sendAddress)) {
            this.ismobile = false
            this.$ajax.get("/forgetpass/forgetpsw/sendcode", {
              params: {
                custAccount: this.forgetForm.username,
                custMail: this.forgetForm.sendAddress,
                ismobile: this.ismobile
              }
            })
              .then((res) => {
                console.log(res)
                if (res.data.code == '0') {
                  this.$message.success("发送验证码成功，请注意查收")
                  this.uid = res.data.id
                  // this.showfound = false  //显示输入验证码页面
                  this.pager = 2
                  this.countDown()
                } else {
                  this.$message.error(res.data.msg)
                  this.forgetForm.username = ''
                  this.forgetForm.sendAddress = ''
                }
              })
              .catch((err) => {
                console.log(err)
                this.forgetForm.username = ''
                this.forgetForm.sendAddress = ''
              })
          } else {
            this.$message.error("手机号或邮箱格式不正确")
            this.forgetForm.username = ''
            this.forgetForm.sendAddress = ''
          }
        } else {
          this.$message.error("请输入注册用户名")
        }
      },
      //验证验证码
      vailMailCode () {
        if (this.forgetForm.code && this.forgetForm.code.length === 6) {
          this.$ajax.get("/forgetpass/forgetpsw/vailcode", {
            params: {
              receiveCode: this.forgetForm.code,
              uid: this.uid
            }
          })
            .then((res) => {
              console.log(res)
              if (res.data.code == '0') {
                this.$message.success("验证码正确，请重置密码")
                // this.isreset = true  //显示重置密码页面
                this.pager = 3
              } else {
                this.$message.error(res.data.msg)
                this.forgetForm.code = ''
              }
            })
            .catch((err) => {
              console.log(err)
              this.forgetForm.code = ''
            })
        } else {
          this.$message.error("请输入6位验证码")
          this.forgetForm.code = ''
        }
      },
      //重置密码
      resetPsw () {
        if (this.forgetForm.password && this.forgetForm.passwordAgain) {
          if (this.forgetForm.password === this.forgetForm.password) {
            this.$ajax.post("/forgetpass/forgetpsw/resetPsw", {
              custPasswd: md5(this.forgetForm.password),
              id: this.uid
            })
              .then((res) => {
                console.log(res)
                if (res.data.code == '0') {
                  this.$message.success("重置密码成功")
                  this.$router.push('/')  //去往首页
                } else {
                  this.$message.error(res.data.msg)
                  this.forgetForm.password = ''
                  this.forgetForm.passwordAgain = ''
                }
              })
              .catch((err) => {
                console.log(err)
                this.forgetForm.password = ''
                this.forgetForm.passwordAgain = ''
              })
          } else {
            this.$message.error("两次密码应一致")
            this.forgetForm.password = ''
            this.forgetForm.passwordAgain = ''
          }
        } else {
          this.$message.error("两次密码应不为空")
          this.forgetForm.password = ''
          this.forgetForm.passwordAgain = ''
        }
      },
      countDown () {
        this.count = 60
        this.iscount = true
        let timer = setInterval(() => {
          if (this.count > 0) {
            this.count--
          } else {
            this.iscount = false
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/login.css";
</style>
