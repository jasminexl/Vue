<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>修改密码</span>
        </header>
        <div class="main-content">
          <table class="halftable">
            <tr>
              <td class="thirdtr">旧密码：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="pswForm.oldPsw" placeholder="请输入原始密码"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr">新密码：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="pswForm.newPsw" placeholder="请输入新密码"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr">确认新密码：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="pswForm.newPswAgain" placeholder="请再次输入新密码"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <el-button size="mini" type="primary">确认修改</el-button>
              </td>
            </tr>
          </table>
          <!--<div>-->
            <!--<el-input size="mini" v-model="pswForm.oldPsw"></el-input>-->
          <!--</div>-->
          <!--<div>-->
            <!--<el-input size="mini" v-model="pswForm.newPsw"></el-input>-->
          <!--</div>-->
          <!--<div>-->
            <!--<el-input size="mini" v-model="pswForm.newPswAgain"></el-input>-->
          <!--</div>-->
        </div>
      </section>
    </div>
</template>

<script>
    export default {
      name: "password",
      data () {
          return {
            pswForm: {
              oldPsw: '',
              newPsw: '',
              newPswAgain: ''
            }
          }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
