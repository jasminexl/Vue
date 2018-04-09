<template>
    <div class="wrapper">
      <section>
        <header>
          <span>号码申请详情</span>
        </header>
        <div class="main-content">
          <table class="detailtable">
            <tr>
              <td>运营商：{{applydetail.operator}}</td>
              <td>号码数量：{{applydetail.amount}}</td>
              <td>SIM卡类型：{{applydetail.simtype}}</td>
            </tr>
            <tr>
              <td>网络制式：{{applydetail.networktype}}</td>
              <td>用户测套餐：{{applydetail.prelevel}}</td>
              <td>测试期：{{applydetail.testtime}}</td>
            </tr>
            <tr>
              <td>沉默期：{{applydetail.slienttime}}</td>
              <td>申请厂商：{{applydetail.operator}}</td>
              <td>运营商侧预制套餐：{{applydetail.pretime}}</td>
            </tr>
            <tr>
              <td>短信：{{applydetail.message}}</td>
              <td>收件人：{{applydetail.recipient}}</td>
              <td>收件号码：{{applydetail.telephone}}</td>
            </tr>
            <tr>
              <td colspan="3">收件地址：{{applydetail.address}}</td>
            </tr>
          </table>
        </div>
      </section>
      <section class="last">
        <header>
          <span>
            操作记录
          </span>
        </header>
        <div class="main-content">
          <el-table :data="operateData" border size="small">
            <el-table-column prop="status" label="操作"></el-table-column>
            <el-table-column prop="date" label="操作时间"></el-table-column>
            <el-table-column prop="name" label="操作人"></el-table-column>
          </el-table>
          <div class="foot-page">
            <el-pagination
              layout="total, prev, pager, next, jumper"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </section>
      <div style="margin-top: 15px;text-align: right;margin-right: 20px">
        <el-button type="primary" size="mini" @click="goback">返回</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "applydetail",
      data () {
        return {
          detailId: '',
          applydetail: {
            amount: '',  //号码数量
            operator: '1',  //卡制式
            simtype: '1',  //SIM卡类型
            networktype: '1',  //网络制式
            testtime: '1',  //测试期
            prelevel: '1',  //预制套餐挡位
            message: '1',  //短信
            pretime: '1',  //预制套餐时长
            recipient: '',  //收件人
            slienttime: '',  //沉默期
            telephone: '',  //收件号码
            address: ''  //收件地址
          },
          operateData: [
            {
              status: '下单',
              date: '2018-05-02',
              name: '王小虎'
            },
            {
              status: '申请',
              date: '2018-05-22',
              name: '王小虎'
            },
            {
              status: '添加物流信息',
              date: '2018-06-02',
              name: '王小虎'
            }
          ]
        }
      },
      created () {
        this.detailId = this.$route.params.id
        console.log(this.detailId)
      },
      methods: {
        goback () {
          this.$router.push('/home/apply')
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";

</style>
