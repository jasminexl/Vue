<template>
  <div class="wrapper">
    <section v-loading="cardloading">
      <div class="card" style="border-bottom: 1px solid #e9e9e9;">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日激活用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastadd' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;7日激活用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevenadd' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;30日激活用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.thirtyadd' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
      <div class="card" style="border-bottom: 1px solid #e9e9e9;">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日停用用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastsub' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;7日停用用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevensub' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;30日停用用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.thirtysub' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日销户用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastdes' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;7日销户用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevendes' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;30日销户用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.thirtydes' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
    </section>
    <!--<div class="option">-->
      <!--<div class="inline">-->
        <!--<el-date-picker-->
          <!--v-model="query.range"-->
          <!--size="mini"-->
          <!--type="daterange"-->
          <!--format="yyyy-MM-dd"-->
          <!--value-format="yyyy-MM-dd"-->
          <!--range-separator="至"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期"></el-date-picker>-->
      <!--</div>-->
      <!--<div class="inline">-->
        <!--<el-button class="button" type="primary" size="mini" @click="queryUsers">查询</el-button>-->
      <!--</div>-->
      <!--<div class="inline" style="margin-left: 20px">-->
      <!--<el-button class="button" type="primary" size="mini">一个月</el-button>-->
      <!--</div>-->
      <!--<div class="inline">-->
      <!--<el-button class="button" type="primary" size="mini">三个月</el-button>-->
      <!--</div>-->
      <!--<div class="inline">-->
      <!--<el-button class="button" type="primary" size="mini">半年</el-button>-->
      <!--</div>-->
    <!--</div>-->
    <div class="option">
      <div class="inline">
        <el-date-picker
          v-model="query.range"
          size="mini"
          type="daterange"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="inline">
        <el-button class="button" type="primary" size="mini" @click="queryUsers">查询</el-button>
      </div>
    </div>
    <section>
      <header>
        <span>用户量</span>
      </header>
      <div class="main-content">
        <div class="result">
          <div id="lineChart" :option="lineOption"></div>
        </div>
      </div>
    </section>
    <section class="last">
      <header>
        <span>用户量详细表</span>
      </header>
      <div class="main-content" v-loading="tableloading">
        <div class="result">
          <el-table :data="rangeData" border size="small" style="margin-bottom: 5px">
            <el-table-column prop="dateRange" label="时间段"></el-table-column>
            <el-table-column prop="addDateRange" label="累计激活用户数" width="107"></el-table-column>
            <el-table-column prop="subDateRange" label="累计停用用户数" width="107"></el-table-column>
            <el-table-column prop="desDateRange" label="累计销户用户数" width="107"></el-table-column>
            <el-table-column prop="all" label="累计用户数" width="83"></el-table-column>
            <el-table-column prop="addPercent" label="累计激活率" width="83"></el-table-column>
            <el-table-column prop="subPercent" label="累计停用率" width="83"></el-table-column>
            <el-table-column prop="desPercent" label="累计销户率" width="80"></el-table-column>
          </el-table>
          <el-table :data="tableData" border size="small">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="addPerDate" label="日激活用户数"></el-table-column>
            <el-table-column prop="subPerDate" label="日停用用户数"></el-table-column>
            <el-table-column prop="desPerDate" label="日销户用户数"></el-table-column>
          </el-table>
        </div>
        <!--<div class="foot-page">-->
          <!--<el-pagination-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="pagination.curpage"-->
            <!--:page-size="pagination.pagesize"-->
            <!--layout="total, prev, pager, next, jumper"-->
            <!--:total="pagination.totalsize">-->
          <!--</el-pagination>-->
        <!--</div>-->
      </div>
    </section>
  </div>
</template>

<script>
  import countTo from 'vue-count-to'
  import HighChart from 'highcharts'
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
            lastadd: 0,  //昨日新增用户数
            sevenadd: 0,  //7日新增用户数
            thirtyadd: 0,  //30日新增用户数
            lastsub: 0,  //昨日停机用户数
            sevensub: 0,  //7日停机用户数
            thirtysub: 0,  //30日停机用户数
            lastdes: 0,  //昨日停机用户数
            sevendes: 0,  //7日停机用户数
            thirtydes: 0  //30日停机用户数
          },
          query: {
            range: [this.$date.formatDate(new Date(new Date().setDate(new Date().getDate() - 7)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')]  //查询时间段，默认为至今一个月
          },
          lineOption: {
            chart: {
              type: 'line'
            },
            title: {
              text: '日平均用户量'
            },
            colors: ['rgb(144, 237, 125)', 'rgb(247, 163, 92)', 'rgb(67, 67, 72)'],
            // subtitle: {
            //   text: '数据来源: WorldClimate.com'
            // },
            xAxis: {
              categories: []
            },
            yAxis: {
              title: {
                text: '用户量/个'
              }
            },
            plotOptions: {
              line: {
                dataLabels: {
                  enabled: true          // 开启数据标签
                }
              }
            },
            series: []
          },
          tableData: [],
          rangeData: [],
          pagination: {
            curpage: 1,
            pagesize: 10,
            totalsize: 0
          }
        }
      },
      created () {
        this.loadCard()
        this.queryUsers()
      },
      methods: {
        //初始化卡片数据
        loadCard () {
          this.cardloading = true
          this.$ajax.get('/caihiot/api-amount/amount/newAndLose')
            .then((res) => {
              if (res.data.code == '0') {
                console.log(res.data.newAndLoseArray)
                let arr = res.data.newAndLoseArray
                this.card.lastadd = arr[0]
                this.card.sevenadd = arr[1]
                this.card.thirtyadd = arr[2]
                this.card.lastsub = arr[3]
                this.card.sevensub = arr[4]
                this.card.thirtysub = arr[5]
              } else {
                this.$message.error(res.data.msg)
              }
              this.cardloading = false
            })
            .catch((err) => {
              console.log(err)
            })
        },
        //查询用户量
        queryUsers () {
          console.log(this.query)
          this.tableloading = true
          this.$ajax.post('/caihiot/api-amount/amount/getuserstable', {
            firstDate: this.query.range[0],
            endDate: this.query.range[1]
          })
            .then((res) => {
              if (res.data.code == '0') {
                console.log(res.data)
                this.lineOption.xAxis.categories = res.data.datePerArr
                this.lineOption.series = res.data.ydata
                HighChart.chart('lineChart', this.lineOption)
                this.rangeData = res.data.dateRange
                this.tableData = res.data.date
              } else {
                this.$message.error(res.data.msg)
              }
              this.tableloading = false
            })
            .catch((err) => {
              console.log(err)
            })
        },
        //分页按钮
        handleCurrentChange (val) {
          console.log('val')
          console.log(val)
          this.pagination.curpage = val
          this.queryUsers()
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
