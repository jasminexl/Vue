<template>
    <div class="navside" id="navside">
      <el-menu unique-opened router :default-active="dactive">
        <el-submenu index="1" v-show="passed">
          <template slot="title">账号总览</template>
          <el-menu-item index="/home/main">账号总览</el-menu-item>
        </el-submenu>
        <el-submenu index="2" v-show="passed">
          <template slot="title">号码管理</template>
          <el-menu-item index="/home/apply">号码申请</el-menu-item>
          <el-menu-item index="/home/handle">号码操作</el-menu-item>
          <el-menu-item index="/home/query">号码查询</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-show="passed">
          <template slot="title">用户数据</template>
          <el-menu-item index="/home/users">用户量</el-menu-item>
        </el-submenu>
        <!--<el-submenu index="4" v-show="passed">-->
          <!--<template slot="title">流量使用情况</template>-->
          <!--<el-menu-item index="/home/usage">流量使用情况</el-menu-item>-->
        <!--</el-submenu>-->
        <el-submenu index="5">
          <template slot="title">设置</template>
          <!--<el-menu-item index="/home/attribute">自定义属性管理</el-menu-item>-->
          <el-menu-item index="/home/companyinfo" v-show="committed">企业信息</el-menu-item>
          <el-menu-item index="/home/certification" v-show="certificate">企业认证</el-menu-item>
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
        passed () {
          //状态为1表示通过认证，true显示完整侧边栏
          return this.status == '1'
        },
        committed () {
          //状态2表示未认证，true显示提交认证后的企业信息
          return this.status != '2'
        },
        certificate () {
          //状态2表示未认证，状态4表示未通过，true显示企业认证页面，表示需要认证或再次认证
          return this.status == '2' || this.status == '4'
        }
      },
      created () {
        this.$root.eventHub.$on('even', (tar) => {
          this.intime(tar)
        })
      },
      data () {
        return {
          status: localStorage.getItem('status')
        }
      },
      methods: {
        intime (tar) {
          this.status = tar
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
