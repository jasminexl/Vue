<template>
  <div class="wrapper">
    <section v-loading="cardloading">
      <div class="card" style="border-bottom: 1px solid #e9e9e9;">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日新增用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastadd' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;7日新增用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevenadd' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;30日新增用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.thirtyadd' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日流失用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastsub' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;7日流失用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevensub' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;30日流失用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.thirtysub' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
    </section>
    <div class="option">
      <div class="inline">
        <el-date-picker
          v-model="query.range"
          size="mini"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="inline">
        <el-button class="button" type="primary" size="mini">查询</el-button>
      </div>
      <!--<div class="inline" style="margin-left: 20px">-->
      <!--<el-button class="button" type="primary" size="mini">一个月</el-button>-->
      <!--</div>-->
      <!--<div class="inline">-->
      <!--<el-button class="button" type="primary" size="mini">三个月</el-button>-->
      <!--</div>-->
      <!--<div class="inline">-->
      <!--<el-button class="button" type="primary" size="mini">半年</el-button>-->
      <!--</div>-->
    </div>
    <section>
      <header>
        <span>用户量</span>
      </header>
      <div class="main-content">
        <div class="result">
          图表
        </div>
      </div>
    </section>
    <section class="last">
      <header>
        <span>用户量详细表</span>
      </header>
      <div class="main-content" v-loading="tableloading">
        <el-table :data="tableData" border size="small">
          <el-table-column prop="date" label="日期"></el-table-column>
          <el-table-column prop="name" label="日新增用户数"></el-table-column>
          <el-table-column prop="address" label="累计总用户数"></el-table-column>
          <el-table-column prop="address" label="日流失用户数"></el-table-column>
          <el-table-column prop="address" label="累计流水用户数"></el-table-column>
          <el-table-column prop="address" label="在网率"></el-table-column>
          <!--<el-table-column prop="address" label="当前在网用户数"></el-table-column>-->
          <!--<el-table-column prop="address" label="月活跃率"></el-table-column>-->
        </el-table>
        <div class="foot-page">
          <el-pagination
            layout="total, prev, pager, next, jumper"
            :total="pager.totalpage">
          </el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'
    export default {
      name: "users",
      components: {
        countTo
      },
      data () {
        return {
          cardloading: false,  //卡片查询中，默认隐藏loading
          chartloading: false,  //图表查询中，默认隐藏loading
          tableloading: false,  //表格查询中，默认隐藏loading
          startnum: 0,  //计数开始数
          card: {
            lastadd: 2000,  //昨日新增用户数
            sevenadd: 3123,  //7日新增用户数
            thirtyadd: 2131,  //30日新增用户数
            lastsub: 21312,  //昨日流失用户数
            sevensub: 21133,  //7日流失用户数
            thirtysub: 1231  //30日流失用户数
          },
          query: {
            range: [new Date().setMonth(new Date().getMonth() - 1), new Date()]  //查询时间段，默认为至今一个月
          },
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '1516 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '1516 弄'
          }],
          pager: {
            totalpage: 10  //分页总页数
          }
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
