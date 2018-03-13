<template>
  <div class="login-wrap">
    <header>
      <div class="logo">
        <img src="../../assets/img/index-logo1.png" height="41" width="105"/>
        <span>中国东信渠道开放平台</span>
      </div>
    </header>
    <main>
      <div class="login-form">
        <div class="login-content">
          <div class="login-group">
            <h3>中国东信渠道开放平台</h3>
            <router-link to="/home/ordertest">girl</router-link>
          </div>
          <form>
            <div class="login-group">
              <input type="text" placeholder="用户名" v-model.trim="username" @blur="checkUser"/>
            </div>
            <div class="login-group">
              <input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>
            </div>
            <div class="login-group" style="position: relative; top: -15px; margin-bottom: 3px">
              <input type="text" placeholder="验证码" v-model.trim="code" @keyup.enter="login" onkeyup="value = value.replace(/[\W]/g,'')" maxlength="4" oninput="if (value.length>4) {value=value.slice(0,4)}" style="padding-right: 0; width: 150px" @blur="checkCode"/>
              <img id="img" @click="getCode" width="100" height="38" style="position: relative; top: 13px"/>
            </div>
            <div class="login-group">
              <button type="button" value="login" @click="login" :disabled="iscount" :class="{disable: iscount}">
                <span>登录</span>
                <span v-show="isshow">（{{count}}s）</span>
              </button>
            </div>
            <div v-show="loading" class="login-group">
              <loading></loading>
            </div>
            <div v-show="!loading" class="login-group">
              <span>{{this.errortext}}</span>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>

</template>

<script>
  import Loading from '../commom/loading'
  import md5 from 'js-md5'
  let base64 = require('js-base64').Base64

  export default {
    name: 'login',
    components: {
      Loading
    },
    data () {
      return {
        // 登录信息
        username: '',
        password: '',
        date: '',  // 时间戳
        code: '',  // 验证码
        errortext: '',
        // 是否显示loading.gif true为显示
        loading: false,
        // 是否禁用按钮 true为禁用
        iscount: false,
        // 是否显示按钮上的倒计时文字 true为显示
        isshow: false,
        // 倒计时秒数
        count: ''
      }
    },
    created () {
      console.log(sessionStorage.getItem('meno'))
    },
    mounted () {
      this.getCode()
    },
    methods: {
      cleanForm () {
        this.username = ''
        this.password = ''
        this.code = ''
      },
      errorPrint (type, error) {
        if (type === 'check') {
          this.errortext = error
          this.iscount = true
        } else if (type === 'login') {
          this.loading = false
          this.errortext = error
          this.countdown()
          this.getCode()
        }
      },
      checkUser () {
        let userReg = /^[a-zA-Z0-9_-]{6,16}$/
        if (this.username) {
          if (this.username.length > 5 && this.username.length < 17) {
            if (userReg.test(this.username)) {
              this.errortext = ''
              this.iscount = false
            } else {
              // 不符合正则
              this.errorPrint('check', '您的用户名只能含有字母、数字、下划线和横杠！')
            }
          } else {
            // 长度不在6-16
            this.errorPrint('check', '您的用户名应为6-16位！')
          }
        } else {
          // 为空
          this.errorPrint('check', '您的用户名不可为空！')
        }
      },
      checkPsw () {
        let pswReg = /^[a-zA-Z0-9]{6,16}$/
        if (this.password) {
          if (this.password.length > 5 && this.password.length < 17) {
            if (pswReg.test(this.password)) {
              this.errortext = ''
              this.iscount = false
            } else {
              // 不符合正则
              this.errorPrint('check', '您的密码只能含有字母、数字！')
            }
          } else {
            // 长度不在6-16
            this.errorPrint('check', '您的密码应为6-16位！')
          }
        } else {
          // 为空
          this.errorPrint('check', '您的密码不可为空！')
        }
      },
      checkCode () {
        if (this.code !== '' && this.code.length === 4) {
          console.log('验证码格式正确')
          this.errortext = ''
          return true
        } else {
          // 验证码为空或长度不为4
          this.errorPrint('check', '验证码应为4位！')
          return false
        }
      },
      login () {
        const self = this
        self.loading = true  // 显示loading.gif
        if (self.username && self.password) {
          if (self.checkCode()) {
            console.log('确认验证码是否正确')
            self.$ajax.get('/channel/vail/vailVerify', {
              params: {
                date: self.date,
                verify: self.code.toLowerCase()
              }
            })
              .then((res) => {
                console.log(res)
                console.log(res.data)
                if (res.data.code === '0000') {
                  // 验证码正确
                  console.log('验证码正确')
                  self.errortext = ''
                  self.iscount = false
                  console.log('进入请求login')
                  // axios
                  self.$ajax.post('/channel/user/login', {
                    username: base64.encode(self.username),
                    password: base64.encode(md5(self.password))
                  })
                    .then((res) => {
                      console.log(res)
                      console.log(res.data)
                      if (res.data.code === '0000') {
                        // 改变提示信息
                        self.loading = false
                        self.errortext = '登录成功！'
                        // 存登录状态和信息
                        self.setCookies('username', base64.encode(res.data.date.meno), 60)
                        window.sessionStorage.setItem('id', res.data.date.id)
                        window.sessionStorage.setItem('meno', base64.encode(res.data.date.meno))
                        self.$store.commit('isLogin', true)
                        self.$router.push('/home')
                        console.log('islogin1' + self.$store.state.islogin)
                      } else if (res.data.code === '1002') {
                        // 用户名或密码错误
                        self.errorPrint('login', '您的用户名或密码错误！')
                        self.cleanForm()
                      } else if (res.data.code === '1000') {
                        // 未知错误
                        self.errorPrint('login', '未知错误！请刷新重试！')
                        self.cleanForm()
                      }
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                } else if (res.data.code === '1003') {
                  // 验证码错误
                  this.code = ''
                  self.errorPrint('login', '验证码错误！')
                } else if (res.data.code === '1000') {
                  // 未知错误
                  self.errorPrint('login', '未知错误！请刷新重试！')
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            // 验证码长度不为4
            self.errorPrint('login', '验证码应为4位！')
          }
        } else {
          // 登录信息为空
          self.errorPrint('login', '您的登录信息不可为空！')
        }
      },
      // 获取验证码
      getCode () {
        this.date = new Date().getTime()
        this.$ajax({
          method: 'post',
          url: '/channel/vail/getVerify',
          data: {
            date: this.date
          },
          responseType: 'arraybuffer',
          withCredentials: true
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
            document.getElementById('img').setAttribute('src', data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 倒计时
      countdown () {
        if (this.keyInter(this.iscount) === true) {
          console.log('进入倒计时')
          this.count = 5  // 倒计时5秒
          this.isshow = true
          this.iscount = true
          let timer = setInterval(() => {
            if (this.count > 0) {
              this.count--
            } else {
              // 隐藏按钮文字和底部信息
              this.iscount = false
              this.isshow = false
              this.errortext = ''
              clearInterval(timer)
            }
          }, 1000)
        }
      },
      // 首次进入时，会因为this.iscount值为false而返回true，下面的计时方法会继续进行，在禁用后，this.iscount变为true，将Enter禁用，直接返回false，跳出倒计时的方法
      keyInter (flag) {
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
  html, body, .login-wrap {
    overflow: hidden;
  }
  img {
    cursor: pointer;
  }
  .login-wrap {
    height: 1000px;
    background-color: #F4F4F4;
  }
  header {
    background-color: #f9f9f9;
    height: 65px;
  }
  .logo {
    margin-left: 17%;
    padding: 12px 0;
  }
  .logo img {
    padding-right: 18px;
    border-right: 1px solid #adadad;
  }
  .logo span {
    padding-left: 14px;
    position: relative;
    top: -14px;
    font-size: 20px;
    font-weight: bold;
  }
  main {
    background-color: #F4F4F4;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 400px;
  }
  .login-form {
    margin-top: 45%;
    width: 400px;
    height: 350px;
    background-color: #fff;
    border-radius: 4px;
  }
  .login-content {
    width: 100%;
    margin: 0 auto;
    padding-top: 40px;
    text-align: center;
  }
  .login-group {
    margin-bottom: 20px;
    text-align: center;
    font-size: 14px;
  }
  .login-group h3 {
    color: #D4001D;
    font-size: 20px;
  }
  .login-group input {
    padding: 10px 0 10px 10px;
    width: 255px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .login-group button {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 269px;
    background-color: #D4001D;
    color: #fff;
  }
  .disable {
    cursor: not-allowed;
  }

</style>
