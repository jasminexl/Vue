<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>
            企业信息
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
              <td>中国东盟信息港</td>
            </tr>
            <tr>
              <td class="lefttr">工商营业执照注册号：</td>
              <td>123456789012345</td>
            </tr>
            <tr>
              <td class="lefttr">企业工商营业执照：</td>
              <td><img src="../../assets/image/index-logo1.png"/></td>
            </tr>
            <tr>
              <td class="lefttr">手机号：</td>
              <td>18612248836</td>
            </tr>
            <tr>
              <td class="lefttr">Email：</td>
              <td>jundeng@caih.com</td>
            </tr>
            <tr>
              <td class="lefttr">法人姓名：</td>
              <td>鲁东亮</td>
            </tr>
            <tr>
              <td class="lefttr">法人身份证号：</td>
              <td>3503**********0019</td>
            </tr>
            <tr>
              <td class="lefttr">法人身份证照片：</td>
              <td style="display: flex; align-items: center">
                <span>正面：</span><img src="../../assets/image/index-logo1.png" style="margin-left: 3px;margin-right: 10px" />
                <span>反面：</span><img src="../../assets/image/main-logo.png" style="margin-left: 3px;margin-right: 10px" />
              </td>
            </tr>
            <tr>
              <td class="lefttr">认证状态：</td>
              <td>认证通过</td>
            </tr>
          </table>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
      name: "companyinfo",
      data () {
        return {
          info: {

          }
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
