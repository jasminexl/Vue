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
        <div class="login-page">
          <div class="login-group">
            <h3>重置密码</h3>
          </div>
          <form>
            <div class="login-group">
              <!--<input type="text" placeholder="用户名" v-model.trim="username" @blur="checkUser"/>-->
              <div class="login-input">
                <el-input size="small" placeholder="手机号/电子邮箱" v-model.trim="forgetForm.username"></el-input>
              </div>
            </div>
            <div class="login-group">
              <!--<input type="password" placeholder="密码" v-model.trim="password" @blur="checkPsw"/>-->
              <div class="login-input" style="width: 150px">
                <el-input size="small" placeholder="验证码" v-model.trim="forgetForm.code" @keyup.enter.native="reset"></el-input>
              </div>
            </div>
            <div class="login-group">
              <!--<button type="button" @click="login">-->
              <!--<span>登录</span>-->
              <!--</button>-->
              <el-button size="mini" @click="reset">
                <span v-show="!loading">下一步</span>
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
    name: "forgetpsw",
    data () {
      return {
        loading: false,
        forgetForm: {
          username: '',
          code: ''
        }
      }
    },
    methods: {
      reset () {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/login.css";
</style>
