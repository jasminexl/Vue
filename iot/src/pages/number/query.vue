<template>
  <div class="wrapper">
    <section v-loading="cardloading">
      <div class="card" style="border-bottom: 1px solid #e9e9e9;">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;总号码数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.total' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
      <div class="card" style="border-bottom: 1px solid #e9e9e9;">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;测试期号码数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.test' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;沉默期号码数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.slient' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;计费期号码数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.charge' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;开机号码数</span>
            <p style="font-size: 26px;margin: 15px 23px 3px 23px"><count-to :startVal='startnum' :endVal='card.start' :duration='2000'></count-to></p>
            <span style="margin-left: 23px"><count-to :startVal='startnum' :endVal='card.startpercent' :duration='2000'></count-to>%（在网率）</span>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;停机号码数</span>
            <p style="font-size: 26px;margin: 15px 23px 3px 23px"><count-to :startVal='startnum' :endVal='card.stop' :duration='2000'></count-to></p>
            <span style="margin-left: 23px"><count-to :startVal='startnum' :endVal='card.stoppercent' :duration='2000'></count-to>%（停机率）</span>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;销户号码数</span>
            <p style="font-size: 26px;margin: 15px 23px 3px 23px"><count-to :startVal='startnum' :endVal='card.destroy' :duration='2000'></count-to></p>
            <span style="margin-left: 23px"><count-to :startVal='startnum' :endVal='card.destroypercent' :duration='2000'></count-to>%（销户率）</span>
          </div>
        </div>
      </div>
    </section>
    <section class="last">
      <header>
        <span class="double-span" style="border-right: 1px solid #000;padding-right: 8px"
              @click="change(1)" :class="{colororange: !changeshow}">号码信息</span>
        <span class="double-span" style="padding-left: 5px"
              @click="change(2)" :class="{colororange: changeshow}">测试/沉默期期限</span>
      </header>
      <div class="main-content" v-show="!changeshow">
        <div class="form-group-half" @mouseenter="info.numquery = false" @mouseleave="info.numquery = true">
          <p class="form-p">按号码/imsi/iccid查询</p>
          <div class="half">
            <el-input size="mini" placeholder="请输入号码/imsi/iccid" clearable v-model="info.number"></el-input>
          </div>
          <div class="inline" style="margin-left: 10px">
            <el-button class="button" type="primary" size="mini" @click="queryNum" :disabled="info.numquery">查询</el-button>
          </div>
        </div>
        <div class="form-group-half" @mouseenter="info.staquery = false" @mouseleave="info.staquery = true">
          <p class="form-p">按状态查询</p>
          <div class="half">
            <el-select size="mini" v-model="info.status" class="hundred">
              <el-option value="0" label="开机"></el-option>
              <el-option value="1" label="停机"></el-option>
              <el-option value="2" label="销户"></el-option>
              <el-option value="3" label="测试期"></el-option>
              <el-option value="4" label="沉默期"></el-option>
            </el-select>
          </div>
          <div style="float: right;margin-right: 50px">
            <el-button class="button" type="primary" size="mini" @click="queryStatus" :disabled="info.staquery">查询</el-button>
          </div>
        </div>
        <div class="result" v-loading="tableloading">
          <el-table :data="tableData" border size="small">
            <el-table-column prop="date" label="号码"></el-table-column>
            <el-table-column prop="name" label="imsi"></el-table-column>
            <el-table-column prop="address" label="iccid"></el-table-column>
            <!--<el-table-column prop="address" label="设备SN"></el-table-column>-->
            <!--<el-table-column prop="address" label="与设备唯一绑定"></el-table-column>-->
            <el-table-column prop="address" label="当前状态"></el-table-column>
            <el-table-column prop="address" label="操作人"></el-table-column>
          </el-table>
          <div class="foot-page">
            <el-pagination
              layout="total, prev, pager, next, jumper"
              :total="100">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="main-content" v-show="changeshow">
        <div class="option">
          <div class="inline">
            <span class="option-span">到期时间：</span>
            <el-date-picker
              v-model="deadline.time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="mini"
              type="date"></el-date-picker>
          </div>
          <div class="inline">
            <span>号码状态：</span>
            <el-radio-group v-model="deadline.status" size="mini">
              <el-radio-button label="0">测试期</el-radio-button>
              <el-radio-button label="1">沉默期</el-radio-button>
            </el-radio-group>
          </div>
          <div class="inline">
            <el-button class="button" type="primary" size="mini" @click="queryDeadLine">查询</el-button>
          </div>
        </div>
        <div class="result" v-loading="tableloading">
          <el-table :data="tableData" border size="small">
            <el-table-column prop="date" label="号码"></el-table-column>
            <el-table-column prop="name" label="进入测试期"></el-table-column>
            <el-table-column prop="address" label="测试期截止"></el-table-column>
            <el-table-column prop="address" label="进入沉默期"></el-table-column>
            <el-table-column prop="address" label="沉默期截止"></el-table-column>
          </el-table>
          <div class="foot-page">
            <el-pagination
              layout="total, prev, pager, next, jumper"
              :total="1000">
            </el-pagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'
    export default {
      name: "query",
      components: {
        countTo
      },
      data () {
        return {
          cardloading: false,  //卡片查询中，默认隐藏loading
          tableloading: false,  //表格查询中，默认隐藏loading
          //卡片section
          startnum: 0,  //计数开始数
          card: {
            total: 2000,  //总号码数
            test: 1000,  //测试期号码
            slient: 400,  //沉默期号码
            charge: 500,  //计费期号码
            start: 700,  //开机号码
            startpercent: 90,  //在网率
            stop: 300,  //停机号码
            stoppercent: 40,  //停机率
            destroy: 600,  //销户号码
            destroypercent: 20  //销户率
          },
          //信息section
          changeshow: false,  //tab切换，默认为显示号码信息
          //号码信息
          info: {
            numquery: true,
            staquery: true,
            number: '',  //查询号码
            status: '0'  //查询状态
          },
          //测试/沉默期期限
          deadline: {
            time: this.$date.formatDate(new Date(), 'yyyy-MM-dd'),  //到期时间
            status: '0'  //号码状态
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      mounted () {
        let s = '1000000'
        this.card.start = parseInt(s)
      },
      methods: {
        change (index) {  //tab切换
          if (index == 1) {
            this.changeshow = false
          } else if (index == 2) {
            this.changeshow = true
          }
        },
        queryNum () {  //号码查询

        },
        queryStatus () {  //状态查询

        },
        queryDeadLine () {
          console.log(this.deadline)
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  .form-group-half {
    width: 49.5%;
    display: inline-block;
    margin-bottom: 0;
  }
</style>
