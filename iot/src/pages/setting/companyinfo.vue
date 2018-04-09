<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>
            企业信息
          </span>
        </header>
        <div class="main-content" v-loading="loading" element-loading-text="拼命加载中">
          <table class="halftable">
            <tr>
              <td class="lefttr">企业名称：</td>
              <td>{{info.companyName}}</td>
            </tr>
            <tr>
              <td class="lefttr">工商营业执照注册号：</td>
              <td>{{info.companyRegNo}}</td>
            </tr>
            <tr>
              <td class="lefttr">企业工商营业执照：</td>
              <td><img class="zoom-in" :src="baseURL + info.companyLicense" @click="magnify($event)" width="100"/></td>
            </tr>
            <tr>
              <td class="lefttr">手机号：</td>
              <td>{{info.companyMobile}}</td>
            </tr>
            <tr>
              <td class="lefttr">Email：</td>
              <td>{{info.companyEmail}}</td>
            </tr>
            <tr>
              <td class="lefttr">法人姓名：</td>
              <td>{{info.legalName}}</td>
            </tr>
            <tr>
              <td class="lefttr">法人身份证号：</td>
              <td>{{info.legalCardNo}}</td>
            </tr>
            <tr>
              <td class="lefttr">法人身份证照片：</td>
              <td style="display: flex; align-items: center">
                <span>正面：</span><img class="zoom-in" :src="baseURL + info.legalFullFace" @click="magnify($event)" width="100" style="margin-left: 3px;margin-right: 10px" />
                <span>反面：</span><img class="zoom-in" :src="baseURL + info.legalSideFace" @click="magnify($event)" width="100" style="margin-left: 3px;margin-right: 10px" />
              </td>
            </tr>
            <tr>
              <td class="lefttr">认证状态：</td>
              <td v-if="info.authenticStatus == '1'">已通过</td>
              <td v-if="info.authenticStatus == '2'">已提交</td>
              <td v-if="info.authenticStatus == '3'">未通过</td>
            </tr>
            <tr v-if="info.authenticStatus != '2'">
              <td class="lefttr">审核意见：</td>
              <td>{{contractContent}}</td>
            </tr>
          </table>
        </div>
      </section>
      <div v-show="showimg" class="img-view">
        <div @click="showimg = false" class="img-layer"></div>
        <img class="img" @click="showimg = false" :src="magnifyImg" height="500"/>
      </div>
    </div>
</template>

<script>
    export default {
      name: "companyinfo",
      computed: {
        baseURL () {
          return 'http://127.0.0.1:9118/'
        }
      },
      data () {
        return {
          loading: false,  //显示loading
          showimg: false,  //放大图片
          magnifyImg: '',  //原始图片路径
          // baseURL: 'http://172.16.0.4:9118/',
          contractContent: '',  //审核意见
          //企业信息
          info: {}


            // id: '',
            // custId: '',
            // companyName: '',
            // companyLicense: '',
            // companyRegNo: '',
            // companyMobile: '',
            // companyEmail: '',
            // legalName: '',
            // legalCardNo: '',
            // legalFullFace: '',
            // legalSideFace: '',
            // isAgree: '',
            // contractContent: '',
            // authenticStatus: '',
            // insertDate: '',
            // insertTime: ''
        }
      },
      created () {
        this.loadData()
      },
      methods: {
        //初始化数据
        loadData () {
          this.loading = true
          this.$ajax.get('/caihiot/api-user/company/info')
            .then((res) => {
              console.log(res.data)
              this.info = res.data.tEnterprizeInfo
              this.contractContent = res.data.tEnterprizeInfo.enterprizeInfoAudit.contractContent
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        },

        //放大图片
        magnify (e) {
          this.magnifyImg = e.target.currentSrc
          this.showimg = true
        },
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
