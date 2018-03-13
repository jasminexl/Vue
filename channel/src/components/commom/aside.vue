<template>
    <div class="side" id="side">
      <div class="nav">
        <el-row>
          <el-col :span="24">
            <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="dactive" unique-opened router>
              <el-submenu index="1">
                <template slot="title">
                  XXX Project
                </template>
                <el-menu-item index="/home/one">本地数据</el-menu-item>
                <el-menu-item index="/home/two">备用金信息</el-menu-item>
                <el-menu-item index="/home/three">页面三</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">Girl Project</template>
                <el-menu-item index="/home/ordertest">Girl信息</el-menu-item>
                <!--<el-menu-item index="two">页面二</el-menu-item>-->
                <!--<el-menu-item index="three">页面三</el-menu-item>-->
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'aside',
    computed: {
      dactive () {
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .side {
    position: absolute;
    left: 0;
    top: 80px;
    bottom: 0;
    width: 200px;
    background-color: #545c64
  }
  .nav {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 201px;
  }

</style>
