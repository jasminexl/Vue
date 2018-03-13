<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
  }
}
</script>

<style>
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html, body, h3, div, header, p, span, a, ul, li {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  body {
    overflow-y: hidden;
  }
  .el-pagination {
    float: right;
    margin: 10px 0;
  }
  .el-pagination__total {
    background-color: #fff;
    margin: 0;
    padding: 0 10px;
  }
</style>
