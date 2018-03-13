<template>
    <div class="wrapper">
      <!--<section v-loading="cardloading">-->
        <!--<div class="card" style="border-bottom: 1px solid #e9e9e9;">-->
          <!--<div class="cardhalf" style="border-right: 1px solid #e9e9e9;">-->
            <!--<div class="cardhalfdiv">-->
              <!--<span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日消耗流量</span>-->
              <!--<p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastuse' :duration='2000'></count-to> Byte</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="cardhalf">-->
            <!--<div class="cardhalfdiv">-->
              <!--<span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;本月已用总流量</span>-->
              <!--<p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.totaluse' :duration='2000'></count-to> Byte</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="card">-->
          <!--<div class="cardhalf" style="border-right: 1px solid #e9e9e9;">-->
            <!--<div class="cardhalfdiv">-->
              <!--<span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日卡均流量</span>-->
              <!--<p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastaver' :duration='2000'></count-to> Byte</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="cardhalf">-->
            <!--<div class="cardhalfdiv">-->
              <!--<span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;近7日卡均流量</span>-->
              <!--<p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevenaver' :duration='2000'></count-to> Byte</p>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</section>-->
      <section>
        <header>
          <span>号码详情</span>
        </header>
        <div class="main-content">
          <table class="detailtable">
            <tr>
              <td>号码：{{numdetail.number}}</td>
              <td>IMSI：{{numdetail.imsi}}</td>
              <td>ICCID：{{numdetail.iccid}}</td>
            </tr>
            <tr>
              <td>导入日期：{{numdetail.inserttime}}</td>
              <td>激活日期：{{numdetail.activetime}}</td>
              <td>生命周期：{{numdetail.lifecycle}}</td>
            </tr>
            <tr>
              <td>卡状态：{{numdetail.cardstatus}}</td>
              <td>设备开关机状态：{{numdetail.powerstatus}}</td>
              <td>设备状态：{{numdetail.status}}</td>
            </tr>
            <tr>
              <td>本月使用流量：{{numdetail.flowuse}}</td>
              <td>本月剩余流量：{{numdetail.flowleft}}</td>
              <td>本月使用短信：{{numdetail.messuse}}</td>
            </tr>
            <tr>
              <td>APN：{{numdetail.apn}}</td>
              <td>IP地址：{{numdetail.ip}}</td>
              <td>接入类型：{{numdetail.type}}</td>
            </tr>
            <tr>
              <td colspan="3">订购套餐：{{numdetail.plan}}</td>
            </tr>
          </table>
        </div>
      </section>
      <section>
        <header>
          <span>流量使用情况</span>
        </header>
        <div class="main-content">
          <div class="option">
            <div style="margin-bottom: 15px">
              <el-date-picker
                v-model="query.beginday"
                type="date"
                size="mini"
                placeholder="选择开始日期">
              </el-date-picker>
              <span style="margin: 0 10px">至</span>
              <el-date-picker
                v-model="query.endday"
                type="date"
                size="mini"
                placeholder="选择结束日期">
              </el-date-picker>
              <el-button class="button" type="primary" size="mini" style="margin-left: 20px">按日查询</el-button>
            </div>
            <div>
              <el-date-picker
                v-model="query.beginmonth"
                type="month"
                size="mini"
                placeholder="选择开始月份">
              </el-date-picker>
              <span style="margin: 0 10px">至</span>
              <el-date-picker
                v-model="query.endmonth"
                type="month"
                size="mini"
                placeholder="选择结束月份">
              </el-date-picker>
              <el-button class="button" type="primary" size="mini" style="margin-left: 20px">按月查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="chartloading">
            <div class="table-span"><span>流量使用情况-按日统计</span></div>
          </div>
          <!--<div class="result" v-loading="tableloading">-->
            <!--<div class="table-span"><span>详细数据-按日统计</span></div>-->
            <!--<el-table-->
              <!--:data="detaildata"-->
              <!--style="width: 100%">-->
              <!--<el-table-column-->
                <!--prop="date"-->
                <!--label="日期">-->
              <!--</el-table-column>-->
              <!--<el-table-column label="消耗值（日）">-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="流量值">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="同比">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="环比">-->
                <!--</el-table-column>-->
              <!--</el-table-column>-->
              <!--<el-table-column label="每日卡均流量">-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="流量值">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="同比">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="环比">-->
                <!--</el-table-column>-->
              <!--</el-table-column>-->
              <!--<el-table-column label="每7日卡均流量">-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="流量值">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="同比">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="环比">-->
                <!--</el-table-column>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<div class="foot-page">-->
              <!--<el-pagination-->
                <!--layout="total, prev, pager, next, jumper"-->
                <!--:total="1000">-->
              <!--</el-pagination>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </section>
      <section class="last">
        <header>
          <span>状态变更记录</span>
        </header>
        <div class="main-content">
          <el-table :data="statusData" border size="small">
            <el-table-column prop="status" label="状态变更"></el-table-column>
            <el-table-column prop="date" label="时间"></el-table-column>
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
      name: "detail",
      data () {
        return {
          numdetail: {  //号码详情数据
            number: '13123456789',
            imsi: '21324354546212',
            iccid: '1323628492340274382753',
            inserttime: '2017-10-01 11:00',
            activetime: '2018-10-10 11:22',
            lifecycle: '计费期',
            cardstatus: '0',
            powerstatus: '0',
            status: '0',
            flowuse: '0',
            flowleft: '0',
            messuse: '0',
            apn: '暂无信息',
            ip: '127.0.0.1',
            type: '4G',
            plan: '每月10M套餐'
          },
          chartloading: false,
          statusData: [  //状态变更记录
            {
              status: '开机',
              date: '2018-05-02',
              name: '王小虎'
            },
            {
              status: '停机',
              date: '2018-05-22',
              name: '王小虎'
            },
            {
              status: '开机',
              date: '2018-06-02',
              name: '王小虎'
            }
          ],
          query: {
            beginday: '',  //开始日
            endday: '',  //结束日
            beginmonth: '',  //开始月
            endmonth: ''  //结束月
          }
        }
      },
      methods: {
        goback () {
          this.$router.push('/home/usage')
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
