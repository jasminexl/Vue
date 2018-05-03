<template>
  <div class="myheader">
    <div class="header-content">
      <div class="header-logo" style="cursor: default">
        <img src="../assets/image/weblogo_x.png" width="40"/>
        <span>
          订单管理系统客户平台
        </span>
      </div>
      <!--<div class="header-center">-->
        <!--<span>厂商：</span>-->
        <!--<el-select size="mini" v-model="selected">-->
          <!--<el-option value="演示账号"></el-option>-->
        <!--</el-select>-->
      <!--</div>-->
      <div class="header-user" @mouseenter="showUser" @mouseleave="closeUser">
        <!--<img src="../assets/image/user.png" width="22"/>-->
        <span class="username">您好, {{username}}</span>
        <span style="margin-left: 20px;cursor: pointer" @click="logout">注销</span>
        <!--<div class="user-tab" v-show="showtab">-->
          <!--<div>-->
            <!--<span @click="showchange = true">修改密码</span>-->
          <!--</div>-->
          <!--<div>-->
            <!--<span @click="logout">注销</span>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="showchange"
      width="400px"
      top="14%">
      <el-form size="mini" :model="pswForm">
        <el-form-item size="mini" label="原始密码" :label-width="formLabelWidth">
          <el-input size="mini" v-model="pswForm.oldPsw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input size="mini" v-model="pswForm.newPsw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input size="mini" v-model="pswForm.newPswAgain" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel">取 消</el-button>
        <el-button size="mini" type="primary" @click="changePsw">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
      name: "myheader",
      data () {
        return {
          selected: '演示账号',
          username: '',
          showtab: false,
          showchange: false,
          pswForm: {
            oldPsw: '',
            newPsw: '',
            newPswAgain: ''
          },
          formRules: {
            oldrule: [
              { required: true, message: '请输入原始密码', trigger: 'blur' }
            ]
          },
          formLabelWidth: '80px'
        }
      },
      created () {
        this.getAccount()
        // this.username = localStorage.getItem("username")
      },
      methods: {
        getAccount () {
          this.$ajax.get("/caihiot/api-user/user/getCustAccount")
            .then((res) => {
              console.log(res.data)
              this.username = res.data.account
            })
            .catch((err) => {
              console.log(err)
            })
        },
        showUser () {
          this.showtab = true
        },
        closeUser () {
          this.showtab = false
        },
        cancel () {
          this.showchange = false
          // this.pswForm.oldPsw = null
          // this.pswForm.newPsw = null
          // this.pswForm.newPswAgain = null
          for(let name in this.pswForm) {
            this.pswForm[name] = ""
          }
        },
        checkPsw () {

        },
        changePsw () {
          //将pswForm发给后台
          this.showchange = false
          for(let name in this.pswForm) {
            this.pswForm[name] = ""
          }
          console.log(this.pswForm.oldPsw)
        },
        logout () {
          localStorage.removeItem("token")
          this.$router.push('/')
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
    z-index: 100;
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
  .user-tab {
    position: absolute;
    width: 120px;
    height: 76px;
    margin-left: -58px;
    border-radius: 6px;
    background-color: #fff;
    color: #000;
    box-shadow: 1px 1px 5px #ccc;
    z-index: 100;
  }
  .user-tab div {
    margin: 5px 0;
    padding: 5px 10px;
    cursor: pointer;
  }
  .user-tab div:hover {
    /*background-color: #e6e6e6;*/
    color: #409EFF;
  }

</style>
