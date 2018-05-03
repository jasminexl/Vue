<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>修改密码</span>
        </header>
        <div class="main-content">
          <!--<table class="halftable">-->
            <!--<tr>-->
              <!--<td class="thirdtr">旧密码：</td>-->
              <!--<td>-->
                <!--<div class="righttr">-->
                  <!--<el-input size="mini" v-model="pswForm.oldPsw" placeholder="请输入原始密码"></el-input>-->
                <!--</div>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td class="thirdtr">新密码：</td>-->
              <!--<td>-->
                <!--<div class="righttr">-->
                  <!--<el-input size="mini" v-model="pswForm.newPsw" placeholder="请输入新密码"></el-input>-->
                <!--</div>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td class="thirdtr">确认新密码：</td>-->
              <!--<td>-->
                <!--<div class="righttr">-->
                  <!--<el-input size="mini" v-model="pswForm.newPswAgain" placeholder="请再次输入新密码"></el-input>-->
                <!--</div>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td></td>-->
              <!--<td>-->
                <!--<el-button size="mini" type="primary" @click="changePsw">确认修改</el-button>-->
              <!--</td>-->
            <!--</tr>-->
          <!--</table>-->
          <el-form status-icon :model="pswForm" :rules="pswRule" ref="ruleForm">
            <el-form-item label="原始密码" label-width="30%" size="mini" prop="oldPsw">
              <div style="width: 70%">
                <el-input autofocus type="password" size="mini" v-model="pswForm.oldPsw" placeholder="请输入原始密码" auto-complete="off"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="新密码" label-width="30%" size="mini" prop="newPsw">
              <div style="width: 70%">
                <el-input type="password" size="mini" v-model="pswForm.newPsw" placeholder="请输入新密码" auto-complete="off"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="确认新密码" label-width="30%" size="mini" prop="checkPsw">
              <div style="width: 70%">
                <el-input type="password" size="mini" v-model="pswForm.checkPsw" placeholder="请确认新密码" auto-complete="off"></el-input>
              </div>
            </el-form-item>
            <el-form-item label-width="30%">
              <el-button size="mini" type="primary" @click="resetPsw('ruleForm')">提交</el-button>
              <el-button size="mini" @click="clearForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
    </div>
</template>

<script>
  import md5 from "js-md5"
    export default {
      name: "password",
      data () {
        let pswReg = (rule, value, callback) => {
          if (!/^[a-zA-Z0-9]{6,16}$/.test(value)) {
            callback(new Error('密码只能是6~16位字母和数字'))
          } else {
            callback()
          }
        }
        let newPsw = (rule, value, callback) => {
          if (value === this.pswForm.oldPsw) {
            callback(new Error('新密码不能与原始密码相同'))
          } else {
            callback()
          }
        }
        let checkPsw = (rule, value, callback) => {
          if (value !== this.pswForm.newPsw) {
            callback(new Error('两次输入密码不一致'))
          } else {
            callback()
          }
        }
        return {
          pswForm: {
            oldPsw: '',
            newPsw: '',
            checkPsw: ''
          },
          pswRule: {
            oldPsw: [
              { required: true, message: "请输入原始密码", trigger: 'blur' },
              { validator: pswReg, trigger: 'blur' }
            ],
            newPsw: [
              { required: true, message: "请输入新密码", trigger: 'blur' },
              { validator: pswReg, trigger: 'blur' },
              { validator: newPsw, trigger: 'blur' }
            ],
            checkPsw: [
              { required: true, message: "请输入新密码", trigger: 'blur' },
              { validator: pswReg, trigger: 'blur' },
              { validator: checkPsw, trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        resetPsw(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$ajax.get("/caihiot/api-user/user/changepsw", {
                params: {
                  newpsw: md5(this.pswForm.newPsw),
                  oldpsw: md5(this.pswForm.oldPsw)
                }
              })
                .then((res) => {
                  console.log(res)
                  if (res.data.code == '0') {
                    this.$message.success("修改密码成功")
                    this.clearForm('ruleForm')
                  } else {
                    this.$message.error(res.data.msg)
                    this.clearForm('ruleForm')
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            } else {
              this.$message.error("修改密码信息有误")
              return false
            }
          })
        },
        clearForm(formName) {
          this.$refs[formName].resetFields()
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
