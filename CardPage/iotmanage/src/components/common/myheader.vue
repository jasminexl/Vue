<template>
    <div class="myheader">
      <div class="header-content">
        <div class="header-logo" style="cursor: default">
          <img src="../../assets/image/weblogo_x.png" width="40"/>
          <span>订单管理系统管理平台</span>
        </div>
        <div class="header-user">
          <!--<img src="../../assets/image/user.png" width="22"/>-->
          <span class="username">您好，{{username}}</span>
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
        username: ''
      }
    },
    created () {
      this.getAccount()
    },
    methods: {
      getAccount () {
        this.$ajax.get("/caihiot/api-admin/admin/getCustAccount")
          .then((res) => {
            console.log(res.data)
            this.username = res.data.account
          })
          .catch((err) => {
            console.log(err)
          })
      },
      logout () {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/header.css";
</style>
