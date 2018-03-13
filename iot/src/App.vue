<template>
  <div id="app">
    <router-view/>
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
  height: 100%;
  font-size: 14px;
  height: 100%;
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
.el-table thead.is-group th {
  background-color: #fafafa;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>
