<template>
    <div class="myheader">
      <div class="header-content">
        <div class="header-logo" style="cursor: default">
          <img src="../../assets/image/weblogo_x.png" width="40"/>
          <span>中国东信通信平台</span>
        </div>
        <div class="header-user">
          <img src="../../assets/image/user.png" width="22"/>
          <span class="username">{{username}}</span>
          <span style="margin-left: 20px;cursor: pointer" @click="logout">注销</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "myheader",
    data () {
      return {
        username: '姜伟'
      }
    },
    methods: {
      logout () {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .myheader {
    height: 60px;
    background: linear-gradient(#434343, #000);
    background: -o-linear-gradient(#434343, #000);
    background: -webkit-linear-gradient(#434343, #000);
    background: -moz-linear-gradient(#434343, #000);
    color: #fff;
    box-shadow: 0 1px 2px #000;
  }
  .header-content {
    width: 100%;
    height: 60px;
    max-width: 1160px;
    margin: 0 auto;
  }
  .header-logo {
    float: left;
    position: relative;
    margin-left: 30px;
  }
  .header-logo img {
    position: absolute;
    top: 50%;
    margin-top: -20px;
    margin-left: 26px;
    z-index: 10;
  }
  .header-logo span {
    line-height: 60px;
    font-size: 20px;
    margin-left: 80px;
  }
  .header-center {
    float: left;
    margin-left: 220px;
  }
  .header-center span {
    line-height: 60px;
  }
  .header-user {
    float: right;
    position: relative;
    height: 60px;
    right: 60px;
    cursor: default;
  }
  .header-user img {
    position: absolute;
    right: 80px;
    padding: 19px 5px;
  }
  .username {
    line-height: 60px;
  }
</style>
