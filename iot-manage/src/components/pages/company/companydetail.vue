<template>
  <div class="wrapper">
    <section class="last">
      <header>
          <span>
            审核企业信息
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
            <td class="lefttr">企业名称：</td>
            <td>{{info.companyname}}</td>
          </tr>
          <tr>
            <td class="lefttr">工商营业执照注册号：</td>
            <td>{{info.registernum}}</td>
          </tr>
          <tr>
            <td class="lefttr">企业工商营业执照：</td>
            <td><img :src="info.companyurl"/></td>
          </tr>
          <tr>
            <td class="lefttr">手机号：</td>
            <td>{{info.telephone}}</td>
          </tr>
          <tr>
            <td class="lefttr">Email：</td>
            <td>{{info.email}}</td>
          </tr>
          <tr>
            <td class="lefttr">法人姓名：</td>
            <td>{{info.name}}</td>
          </tr>
          <tr>
            <td class="lefttr">法人身份证号：</td>
            <td>{{info.idcard}}</td>
          </tr>
          <tr>
            <td class="lefttr">法人身份证照片：</td>
            <td style="display: flex; align-items: center">
              <span>正面：</span><img :src="info.idcardfront" style="margin-left: 3px;margin-right: 10px" />
              <span>反面：</span><img :src="info.idcardback" style="margin-left: 3px;margin-right: 10px" />
            </td>
          </tr>
          <tr>
            <td class="lefttr" style="padding-right: 15px">
              <el-button type="primary" size="mini">审核通过</el-button>
            </td>
            <td>
              <el-button type="danger" size="mini">审核不通过</el-button>
            </td>
          </tr>
        </table>
      </div>
    </section>
    <div style="margin-top: 15px;text-align: right;margin-right: 20px">
      <el-button type="primary" size="mini" @click="goback">返回</el-button>
    </div>
  </div>
</template>

<script>
  // import bb from '../../../utils/bus'
  export default {
    name: "companydetail",
    data () {
      return {
        info: {
          email: ''
        }
      }
    },
    created () {
    },
    methods: {
      goback () {
        this.$router.push('/home/certification')
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";
</style>
