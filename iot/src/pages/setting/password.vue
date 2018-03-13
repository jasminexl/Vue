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
                <el-button size="mini" type="primary" @click="changePsw">确认修改</el-button>
              </td>
            </tr>
          </table>
          <el-form :model="pswForm" :rules="pswRule" ref="formRef">
            <el-form-item label="原始密码" label-width="30%" size="mini" prop="oldPsw">
              <div style="width: 70%">
                <el-input size="mini" v-model="pswForm.oldPsw" placeholder="请输入原始密码" auto-complete="off"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="原始密码" label-width="30%" size="mini">
              <div style="width: 70%">
                <el-input size="mini" auto-complete="off"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="原始密码" label-width="30%" size="mini">
              <div style="width: 70%">
                <el-input size="mini" auto-complete="off"></el-input>
              </div>
            </el-form-item>
          </el-form>
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
          },
          pswRule: {
            oldPsw: [
              { required: true, message: '请输入活动名称', trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        changePsw () {

        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
