<template>
  <header>
    <div class="logo">
      <img src="../../assets/img/main-logo.png" alt="Logo">
      <span>中国东信</span>
    </div>
    <div class="header-right"  @click="open">
      <img src="../../assets/img/user.png" alt="User" width="20px" height="20px"/>
      <span>
        {{meno}}
      </span>
    </div>
    <div id="usertab">
      <div @click="ispop = true">
        <span>修改密码</span>
      </div>
      <div @click="logout">
        <span>注销</span>
      </div>
    </div>
    <div class="popupbg" v-show="ispop" @click="unPopPsw"></div>
    <div class="popup" v-show="ispop">
      <div class="changepsw">
        <span>修改密码</span>
        <input type="password" placeholder="请输入原始密码" v-model.trim="oldpsw" @blur="oldPsw"/>
        <input type="password" placeholder="请输入新密码" v-model.trim="newpsw" @blur="newPsw"/>
        <input type="password" placeholder="请再次输入新密码" v-model.trim="newpswagain" @blur="againPsw"/>
        <button @click="changePsw" :disabled="issubmit" :class="{disable: issubmit}">提交</button>
        <span id="pswerror">{{pswerror}}</span>
      </div>
    </div>
  </header>
</template>
<script>
  import md5 from 'js-md5'
  let base64 = require('js-base64').Base64
  export default {
    name: 'topHeader',
    data () {
      return {
        ispop: false,  // 弹窗是否显示，true为显示
        // 修改密码Form
        oldpsw: '',
        newpsw: '',
        newpswagain: '',
        pswerror: '',
        issubmit: false  // 修改密码按钮是否禁用，true为禁用
      }
    },
    computed: {
      meno () {
        return base64.decode(window.sessionStorage.getItem('meno'))
      }
    },
    methods: {
      logout () {
        this.$ajax.delete('/channel/user/exit', {
          params: {
            id: window.sessionStorage.getItem('id')
          }
        })
          .then((res) => {
            console.log(res)
            this.deleteCookies('username')
            window.sessionStorage.removeItem('id')
            window.sessionStorage.removeItem('meno')
            this.$router.push('/login')
          })
      },
      // 打开用户选项卡
      open () {
        let user = document.getElementById('usertab')
        if (user.style.display === 'block') {
          user.style.display = 'none'
        } else {
          user.style.display = 'block'
        }
      },
      // 关闭修改密码模态框
      unPopPsw () {
        this.ispop = false
        this.oldpsw = ''
        this.newpsw = ''
        this.newpswagain = ''
        this.pswerror = ''
      },
      // 判断原始密码
      oldPsw () {
        if (this.oldpsw) {
          this.issubmit = false
          this.pswerror = ''
        } else {
          this.pswerror = '请输入原始密码！'
          this.issubmit = true
        }
      },
      // 判断新密码
      newPsw () {
        if (this.newpsw) {
          if (this.newpsw === this.oldpsw) {
            this.pswerror = '新密码不可和原始密码相同！'
            this.issubmit = true
          } else {
            this.issubmit = false
            this.pswerror = ''
          }
        } else {
          this.pswerror = '请输入新密码！'
          this.issubmit = true
        }
      },
      // 判断两次输入新密码是否一致
      againPsw () {
        if (this.newpswagain) {
          if (this.newpswagain !== this.newpsw) {
            this.pswerror = '两次输入新密码不一致！'
            this.issubmit = true
          } else {
            this.issubmit = false
            this.pswerror = ''
          }
        } else {
          this.pswerror = '请再次输入新密码！'
          this.issubmit = true
        }
      },
      // 修改密码
      changePsw () {
        console.log('psw')
        this.pswerror = ''
        // axios请求
        this.$ajax.post('/channel/user/changePWD', {
          id: window.sessionStorage.getItem('id'),
          newPWD: base64.encode(md5(this.newpswagain))
        })
          .then((res) => {
            console.log(res.data)
            if (res.data.code === '0000') {
              this.pswerror = '修改密码成功！'
            } else if (res.data.code === '1001') {
              this.pswerror = '操作失败！'
            } else if (res.data.code === '1000') {
              this.pswerror = '未知错误！请刷新重试！'
            }
          })
          .catch((err) => {
            console.log(err)
          })
        // axios结束
        this.unPopPsw()
      }
    }
  }
</script>
<style scoped>
  header {
    width: 100%;
    height: 80px;
    background-color: #303340;
  }
  .logo {
    margin-left: 30px;
    padding: 14px 0;
  }
  .logo span {
    padding-left: 14px;
    position: relative;
    top: -16px;
    font-size: 20px;
    font-weight: bold;
    color: #F0F0F1;
  }
  .header-right {
    position: absolute;
    top: 30px;
    right: 60px;
    cursor: pointer;
    color: #fff;
  }
  .header-right span {
    position: relative;
    top: -4px;
    left: 3px;
  }
  /*用户操作tab*/
  #usertab {
    display: none;
    position: absolute;
    width: 120px;
    height: 76px;
    top: 65px;
    right: 60px;
    border-radius: 6px;
    background-color: #fcfcfc;
    box-shadow: 1px 1px 5px #888888;
    z-index: 100;
  }
  #usertab div {
    margin: 5px 0;
    padding: 5px 10px;
    cursor: pointer;
  }
  #usertab div:hover {
    background-color: #dbdbdb;
  }
  /*弹窗*/
  .popupbg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .6;
    z-index: 100;
  }
  .popup {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -150px;
    margin-left: -150px;
    width: 300px;
    height: 270px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 101;
  }
  .popup span {
    display: block;
    text-align: center;
    margin: 13px 0 10px 0;
  }
  .popup input {
    padding: 10px;
    margin: 0 29px 15px 29px;
    width: 220px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .popup button {
    padding: 8px;
    margin: 0 29px 5px 29px;
    width: 242px;
    border: 1px solid #ccc;
    border-radius: 5px;
    /*cursor: pointer;*/
  }
  #pswerror {
    margin: 5px;
    font-size: 14px;
  }
  .disable {
    cursor: not-allowed;
  }

</style>
