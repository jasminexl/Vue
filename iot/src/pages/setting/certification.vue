<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>
            企业认证
          </span>
        </header>
        <div class="main-content"
             v-loading="disabled.submitBtn" element-loading-text="正在提交中，请稍候" element-loading-spinner="el-icon-loading">
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
                  <el-input size="mini" v-model="cerForm.companyRegNo" placeholder="工商营业执照注册号"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>企业工商营业执照：</td>
              <td>
                <div class="righttr">
                  <el-upload
                    :action="upload.action"
                    ref="companyUpload"
                    name="img"
                    accept="image/*"
                    :file-list="companyList"
                    v-bind:data="{'imgName': cerForm.companyLicense}"
                    :limit="upload.limit"
                    :multiple="upload.falseMean"
                    :auto-upload="upload.falseMean"
                    :on-change="handleChangeCompany"
                    :on-remove="handleRemoveCompany"
                    :before-upload="beforeHandle"
                    :on-exceed="handleExceed"
                    v-bind:on-success="handleSuccessCompany"
                    class="avatar-uploader">
                    <img v-if="cerForm.companyImage" :src="cerForm.companyImage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>手机号：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.companyMobile" placeholder="手机号"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>电子邮箱：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.companyEmail" placeholder="电子邮箱"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人姓名：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.legalName" placeholder="法人姓名"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人身份证号：</td>
              <td>
                <div class="righttr">
                  <el-input size="mini" v-model="cerForm.legalCardNo" placeholder="法人身份证号"></el-input>
                </div>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人身份证正面照片：</td>
              <td>
                <el-upload
                  :action="upload.action"
                  ref="fullUpload"
                  name="img"
                  accept="image/*"
                  :file-list="fullfaceList"
                  v-bind:data="{'imgName': cerForm.legalFullFace}"
                  :limit="upload.limit"
                  :multiple="upload.falseMean"
                  :auto-upload="upload.falseMean"
                  :on-remove="handleRemoveFull"
                  :before-upload="beforeHandle"
                  :on-exceed="handleExceed"
                  :on-change="handleChangeFull"
                  v-bind:on-success="handleSuccessFull"
                  class="avatar-uploader">
                  <img v-if="cerForm.idCardFront" :src="cerForm.idCardFront" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </td>
            </tr>
            <tr>
              <td class="thirdtr"><span class="colorred">*</span>法人身份证反面照片：</td>
              <td>
                <el-upload
                  :action="upload.action"
                  ref="sideUpload"
                  name="img"
                  accept="image/*"
                  :file-list="sidefaceList"
                  v-bind:data="{'imgName': cerForm.legalSideFace}"
                  :limit="upload.limit"
                  :multiple="upload.falseMean"
                  :auto-upload="upload.falseMean"
                  :on-remove="handleRemoveSide"
                  :before-upload="beforeHandle"
                  :on-exceed="handleExceed"
                  :on-change="handleChangeSide"
                  v-bind:on-success="handleSuccessSide"
                  class="avatar-uploader">
                  <img v-if="cerForm.idCardBack" :src="cerForm.idCardBack" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </td>
            </tr>
            <!--<tr>-->
              <!--<td class="thirdtr"></td>-->
              <!--<td>-->
                <!--<el-checkbox v-model="cerForm.isAgree" true-label="0" false-label="1"></el-checkbox>-->
                <!--<span>我同意<a class="colorblue" @click="popup">XXXX协议</a></span>-->
              <!--</td>-->
            <!--</tr>-->
            <tr>
              <td class="thirdtr"></td>
              <td>
                <el-button size="mini" type="primary" :disabled="disabled.submitBtn" @click="submit">
                  <span v-if="!disabled.submitBtn">确认提交</span>
                  <i v-else class="el-icon-loading"></i>
                </el-button>
              </td>
            </tr>
          </table>
        </div>
      </section>
    </div>
</template>

<script>
  const uuidv4 = require('uuid/v4')
    export default {
      name: "certification",
      data () {
        return {
          companyList: [],
          fullfaceList: [],
          sidefaceList: [],
          //上传图片设置
          upload: {
            action: 'http://127.0.0.1:9097/img/upload',  //上传地址
            limit: 1,  //个数限制
            falseMean: false
          },
          //企业信息表单，图片非选择后立即上传，防止过多上传，占用服务器资源
          //前端先生成uuid作为图片名称，在点击提交时，先上传图片和图片名称，再提交form表单，里面标识图片名称
          cerForm: {
            custId: '',
            companyName: '',
            companyImage: '',  //图片本地路径，用于前端显示
            companyLicense: uuidv4().replace(/\-/g,'') + '.png',
            companyRegNo: '',
            companyMobile: '',
            companyEmail: '',
            legalName: '',
            legalCardNo: '',
            idCardFront: '',  //图片本地路径，用于前端显示
            legalFullFace: uuidv4().replace(/\-/g,'') + '.png',
            idCardBack: '',  //图片本地路径，用于前端显示
            legalSideFace: uuidv4().replace(/\-/g,'') + '.png',
            isAgree: '1'
          },
          //按钮禁用，loading和显示
          disabled: {
            submitBtn: false
          }
        }
      },
      created () {
      },
      methods: {
        submit () {
          let cnameObj = {
            param: this.cerForm.companyName,
            paramName: '企业名称'
          }
          let regObj = {
            param: this.cerForm.companyRegNo,
            paramName: '工商营业执照注册号'
          }
          let telObj = {
            param: this.cerForm.companyMobile,
            type: 'regexp',
            content: [/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/],
            msg: '手机号不符合规格',
            paramName: '手机号'
          }
          let emailObj = {
            param: this.cerForm.companyEmail,
            type: 'regexp',
            content: [/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
            msg: '电子邮箱不符合规格',
            paramName: '电子邮箱'
          }
          let nameObj = {
            param: this.cerForm.legalName,
            paramName: '法人姓名'
          }
          let idObj = {
            param: this.cerForm.legalCardNo,
            type: 'regexp',
            content: [/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/],
            msg: '法人身份证号不符合规格',
            paramName: '法人身份证号'
          }
          this.$refs.companyUpload.submit()
          if (this.$commom.checkParam(cnameObj) && this.$commom.checkParam(regObj) && this.$commom.checkParam(telObj) && this.$commom.checkParam(emailObj) && this.$commom.checkParam(nameObj) && this.$commom.checkParam(idObj)) {
            this.disabled.submitBtn = true
            this.cerForm.isAgree = this.cerForm.isAgree?'0':'1'
            console.log(this.cerForm)
            //先上传图片
            this.$refs.companyUpload.submit()
            this.$refs.fullUpload.submit()
            this.$refs.sideUpload.submit()
            //再将form数据请求过去
            this.$ajax({
              method: 'post',
              url: '/caihiot/api-user/company/authenticate',
              data: {
                cerForm: this.cerForm
              }
            })
              .then((res) => {
                console.log('info-submit', res.data)
                if (res.data.code == '0') {
                  this.$message.success('企业信息提交成功')
                  this.$commom.clearParam(this.cerForm)
                  this.$router.push('/home/companyinfo')
                } else if (res.data.code == '500') {
                  this.$message.error(res.data.msg)
                  this.$commom.clearParam(this.cerForm)
                }
                this.disabled.submitBtn = false
              })
              .catch((err) => {
                console.log(err)
                this.$commom.clearParam(this.cerForm)
                this.disabled.submitBtn = false
              })
          }
        },
        //合同弹框，现合同功能未确定
        popup () {},
        //选择图片时将本地图片路径绑定在页面上，以显示图片
        handleChangeCompany (file) {
          this.cerForm.companyImage = URL.createObjectURL(file.raw)
        },
        handleChangeFull (file) {
          this.cerForm.idCardFront = URL.createObjectURL(file.raw)
        },
        handleChangeSide (file) {
          this.cerForm.idCardBack = URL.createObjectURL(file.raw)
        },
        //上传图片成功时触发
        handleSuccessCompany (res, file) {
          console.log('imgUpload', res)
          let filename = '企业工商营业执照'
          if (res.code == '0') {
            this.companyList = []
            // this.$message.success('企业工商营业执照上传成功')
          } else {
            this.$message.error(filename + res.msg)
            this.companyList = []
          }
        },
        handleSuccessFull (res, file) {
          console.log('imgUpload', res)
          let filename = '法人身份证正面照片'
          if (res.code == '0') {
            this.fullfaceList = []
            // this.$message.success('法人身份证正面照片上传成功')
          } else {
            this.fullfaceList = []
            this.$message.error(filename + res.msg)
          }
        },
        handleSuccessSide (res, file) {
          console.log('imgUpload', res)
          let filename = '法人身份证反面照片'
          if (res.code == '0') {
            this.sidefaceList = []
            // this.$message.success('法人身份证反面照片上传成功')
          } else {
            this.sidefaceList = []
            this.$message.error(filename + res.msg)
          }
        },
        //图片移除时触发
        handleRemoveCompany (file) {
          this.cerForm.companyImage = ''
        },
        handleRemoveFull (file) {
          this.cerForm.idCardFront = ''
        },
        handleRemoveSide (file) {
          this.cerForm.idCardBack = ''
        },
        //上传前限制图片大小或格式
        beforeHandle (file) {
          console.log('file', file)
          // const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 10;
          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 10MB!')
          }
          return isLt2M;
        },
        //超出图片个数限制时触发
        handleExceed (file) {
          this.$message.error('只能上传一张图片')
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
