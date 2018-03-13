<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>
            企业认证
          </span>
        </header>
        <div class="main-content">
          <!--<div class="form-group-half right">企业名称：</div>-->
          <!--<div class="form-group-half">中国东盟信息港</div>-->
          <!--<div class="form-group-half right">工商营业执照注册号：</div>-->
          <!--<div class="form-group-half">123456789012345</div>-->
          <!--<div class="form-group-half right"><span style="float: right">企业工商营业执照：</span></div>-->
          <!--<div class="form-group-half">-->
            <!--<img src="../../assets/image/index-logo1.png"/>-->
          <!--</div>-->
          <!--<div class="form-group-half right">手机号：</div>-->
          <!--<div class="form-group-half">18612248836</div>-->
          <!--<div class="form-group-half right">Email：</div>-->
          <!--<div class="form-group-half">jundeng@caih.com</div>-->
          <!--<div class="form-group-half right">法人姓名：</div>-->
          <!--<div class="form-group-half">鲁东亮</div>-->
          <!--<div class="form-group-half right">法人身份证号：</div>-->
          <!--<div class="form-group-half">3503**********0019</div>-->
          <!--<div class="form-group-half right">法人身份证照片：</div>-->
          <!--<div class="form-group-half">-->

          <!--</div>-->
          <!--<div class="form-group-half right">认证状态：</div>-->
          <!--<div class="form-group-half">认证通过</div>-->
          <table class="halftable">
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>企业名称：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.companyName" placeholder="企业名称"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>工商营业执照注册号：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.registerNum" placeholder="工商营业执照注册号"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>企业工商营业执照：</td>
              <td>
                <el-upload
                  action=""
                  class="avatar-uploader">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>手机号：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.telephone" placeholder="手机号"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>电子邮箱：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.email" placeholder="电子邮箱"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人姓名：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.name" placeholder="法人姓名"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人身份证号：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.id" placeholder="法人身份证号"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人身份证正面照片：</td>
              <td>
                <el-upload
                  action=""
                  class="avatar-uploader">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人身份证反面照片：</td>
              <td>
                <el-upload
                  action=""
                  class="avatar-uploader">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"></td>
              <td>
                <el-checkbox v-model="isagree"></el-checkbox><a class="colorblue agreement" @click="popup">我同意XXXX协议</a>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"></td>
              <td>
                <el-button size="mini" type="primary" :disabled="!isagree" @click="submit">确认提交</el-button>
              </td>
            </tr>
          </table>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
      name: "certification",
      data () {
        return {
          imageUrl: '',
          cerForm: {
            companyName: '',
            registerNum: '',
            telephone: '',
            email: '',
            name: '',
            id: ''
          },
          isagree: false
        }
      },
      created () {
        // this.checkForm()
      },
      methods: {
        submit () {
          let cnameObj = {
            param: this.cerForm.companyName,
            paramName: '企业名称'
          }
          let regObj = {
            param: this.cerForm.registerNum,
            paramName: '工商营业执照注册号'
          }
          let telObj = {
            param: this.cerForm.telephone,
            type: 'regexp',
            content: [/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/],
            msg: '手机号不符合规格',
            paramName: '手机号'
          }
          let emailObj = {
            param: this.cerForm.email,
            type: 'regexp',
            content: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
            msg: '电子邮箱不符合规格',
            paramName: '电子邮箱'
          }
          let nameObj = {
            param: this.cerForm.name,
            paramName: '法人姓名'
          }
          let idObj = {
            param: this.cerForm.id,
            type: 'regexp',
            content: [/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/],
            msg: '法人身份证号不符合规格',
            paramName: '法人身份证号'
          }
          if (this.$commom.checkParam(cnameObj) && this.$commom.checkParam(regObj) && this.$commom.checkParam(telObj) && this.$commom.checkParam(emailObj) && this.$commom.checkParam(nameObj) && this.$commom.checkParam(idObj)) {
            alert('OK')
            this.$commom.clearParam(this.cerForm)
          }
        },
        popup () {

        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  .agreement {
    margin-left: 10px;
    /*text-decoration: #409EFF;*/
  }
</style>
