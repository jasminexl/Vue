<template>
    <div class="wrapper" id="welcome">
      <div class="content">
        <h2>您好，{{meno}}！欢迎使用中国东信渠道开放平台！</h2>
      </div>
    </div>
</template>

<script>
  let base64 = require('js-base64').Base64
  export default {
    name: 'welcome',
    computed: {
      meno () {
        return base64.decode(window.sessionStorage.getItem('meno'))
      }
    },
    mounted () {
      document.getElementById('welcome').style.height = document.getElementById('side').clientHeight + 'px'
    }
  }
</script>

<style scoped>
  @import '../../assets/css/base.css';
  .wrapper {
    background-color: #fff;
  }
  .content {
    margin-left: 30px;
  }

</style>
