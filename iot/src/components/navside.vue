<template>
    <div class="navside" id="navside">
      <el-menu unique-opened router :default-active="dactive">
        <el-submenu index="1">
          <template slot="title">账号总览</template>
          <el-menu-item index="/home/main">账号总览</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">号码管理</template>
          <el-menu-item index="/home/apply">号码申请</el-menu-item>
          <el-menu-item index="/home/handle">号码操作</el-menu-item>
          <el-menu-item index="/home/query">号码查询</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">用户数据</template>
          <el-menu-item index="/home/users">用户量</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">流量使用情况</template>
          <el-menu-item index="/home/usage">流量使用情况</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">设置</template>
          <!--<el-menu-item index="/home/attribute">自定义属性管理</el-menu-item>-->
          <el-menu-item index="/home/companyinfo">企业信息</el-menu-item>
          <el-menu-item index="/home/certification">企业认证</el-menu-item>
          <el-menu-item index="/home/password">密码设置</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
    export default {
      name: "navside",
      computed: {
        dactive () {
          return this.$route.path
        },
        navshow () {
        }
      },
      data () {
        return {

        }
      }
    }
</script>

<style scoped>
  .navside {
    width: 200px;
    position: absolute;
    top: 80px;
    bottom: 0;
  }

</style>
