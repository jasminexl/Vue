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
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日停机用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastsub' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;7日停机用户数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevensub' :duration='2000'></count-to></p>
          </div>
        </div>
        <div class="cardthird">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;30日停机用户数</span>
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
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="inline">
        <el-button class="button" type="primary" size="mini" @click="queryUsers">查询</el-button>
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
          <el-table-column prop="address" label="日停机用户数"></el-table-column>
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
            lastadd: 0,  //昨日新增用户数
            sevenadd: 0,  //7日新增用户数
            thirtyadd: 0,  //30日新增用户数
            lastsub: 0,  //昨日停机用户数
            sevensub: 0,  //7日停机用户数
            thirtysub: 0  //30日停机用户数
          },
          query: {
            range: [this.$date.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')]  //查询时间段，默认为至今一个月
          },
          tableData: [],
          pager: {
            totalpage: 10  //分页总页数
          }
        }
      },
      created () {
        this.loadCard()
      },
      methods: {
        //初始化卡片数据
        loadCard () {
          this.cardloading = true
          this.$ajax.get('/usercard/caihiot/tcardoperator/newAndLose/' + '4fs56af48s9a4f8af97sdf46564')
            .then((res) => {
              console.log(res.data.newAndLoseArray)
              let arr = res.data.newAndLoseArray
              this.card.lastadd = arr[0]
              this.card.sevenadd = arr[1]
              this.card.thirtyadd = arr[2]
              this.card.lastsub = arr[3]
              this.card.sevensub = arr[4]
              this.card.thirtysub = arr[5]
              this.cardloading = false
            })
            .catch((err) => {
              console.log(err)
            })
        },
        //查询用户量
        queryUsers () {
          console.log(this.query)
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
