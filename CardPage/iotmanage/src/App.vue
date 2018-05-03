<template>
  <div id="app">
    <!--<img src="assets/image/logo.png">-->
    <transition name="el-fade-in-linear" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
html, body, h1, h2, h3, h4, h5, h6, div, header, p, span, a, ul, li, table, tr, td {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  cursor: pointer;
}
li {
  list-style: none;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .3s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .3s;
}
.el-menu {
  border-right: 0;
  border-radius: 4px;
}
.el-menu-item, .el-submenu__title {
  padding: 0 40px;
}
.el-table th {
  background-color: #fafafa;
  color: #606266;
}
#dialogTable .el-table__header th {
  background-color: #fff;
  color: #606266;
}
.el-table thead.is-group th {
  background-color: #fafafa;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 124px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
/*.el-tabs--card>.el-tabs__header .el-tabs__item:first-child {*/
  /*background-color: mistyrose;*/
  /*border-color: mistyrose;*/
/*}*/
/*.el-tabs--card>.el-tabs__header .el-tabs__item:first-child:focus {*/
  /*background-color: #409EFF;*/
  /*color: #fff;*/
  /*border-color: #409EFF;*/
/*}*/
/*.el-tabs--card>.el-tabs__header .el-tabs__item:first-child:active {*/
  /*background-color: #409EFF;*/
  /*color: #fff;*/
  /*border-color: #409EFF;*/
/*}*/
/*.el-tabs--card>.el-tabs__header .el-tabs__item:first-child:visited {*/
  /*background-color: #409EFF;*/
  /*color: #fff;*/
  /*border-color: #409EFF;*/
/*}*/
/*.el-tabs--card>.el-tabs__header .el-tabs__item:first-child:hover {*/
  /*background-color: #409EFF;*/
  /*color: #fff;*/
  /*border-color: #409EFF;*/
/*}*/
/*.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {*/
  /*background-color: lightgrey;*/
  /*border-color: lightgrey;*/
/*}*/
/*.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2):hover {*/
  /*background-color: #e9e9e9;*/
/*}*/
/*.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2):active {*/
  /*background-color: #e9e9e9;*/
/*}*/
/*.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2):focus {*/
  /*background-color: #e9e9e9;*/
/*}*/
/*.el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2):visited {*/
  /*background-color: #e9e9e9;*/
/*}*/
</style>
