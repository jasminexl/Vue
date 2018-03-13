<template>
    <div class="wrapper">
      <div class="content" >
        <header>
          <span class="title">渠道名称：{{meno}}</span>
          <span>当前余额：{{balance}}</span>
          <span>更新时间：{{lasttime}}</span>
        </header>
        <main>
          <section class="option">
            <div class="left">
              <div class="optionvalue">
                <span>开始时间：</span>
                <el-date-picker
                  @blur="disdate"
                  v-model="starttime"
                  type="datetime"
                  :picker-options="pickerOptions1"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
              <div class="optionvalue">
                <span>结束时间：</span>
                <el-date-picker
                  v-model="endtime"
                  type="datetime"
                  :picker-options="pickerOptions2"
                  placeholder="选择日期时间">
                </el-date-picker>
              </div>
              <!--<span>开始时间：</span>-->
              <!--<vue-date v-model="starttime" format="YYYY-MM-DD HH:mm:ss"  @blur="disdate"></vue-date>-->
              <!--<span>结束时间：</span>-->
              <!--<vue-date v-model="endtime" format="YYYY-MM-DD HH:mm:ss"></vue-date>-->
              <!--<el-date-picker-->
                <!--v-model="range"-->
                <!--type="datetimerange"-->
                <!--range-separator="至"-->
                <!--start-placeholder="开始日期"-->
                <!--end-placeholder="结束日期">-->
              <!--</el-date-picker>-->
            </div>
            <div class="right">
              <button @click="getAll">当月扣款日志查询</button>
              <a :href="url"><button>导出</button></a>
            </div>
          </section>
          <section v-if="this.querying" class="result">
            <div v-if="this.loading" style="text-align: center">
              <loading></loading>
            </div>
            <table v-if="!this.loading" class="datatable">
              <thead>
              <tr>
                <!--<th>渠道编码</th>-->
                <th>订单号</th>
                <th>手机号</th>
                <th>省份</th>
                <th>运营商</th>
                <th>产品ID</th>
                <th>产品类型</th>
                <th>交易时间</th>
                <th>交易金额</th>
                <th>扣款/返款</th>
              </tr>
              </thead>
              <tbody>
              <tr v-show="!isnone" v-for="(chItem, index) in chcodeList" :class="{odd: index % 2 === 1}">
                <!--<td>{{chItem.chcode}}</td>-->
                <td>{{chItem.srcorderid}}</td>
                <td>{{chItem.phone}}</td>
                <td>{{chItem.provname}}</td>
                <td>{{Operator(chItem.operators)}}</td>
                <td>{{chItem.productid}}</td>
                <td>{{productType(chItem.ftid)}}</td>
                <td>{{chItem.inserttime}}</td>
                <td>{{chItem.totalmoney}}</td>
                <td>{{(chItem.kkflag === 0) ? '扣款' : '返款'}}</td>
              </tr>
              <tr v-show="isnone">
                <td colspan="9">暂无数据</td>
              </tr>
              </tbody>
            </table>
          </section>
        </main>
        <el-pagination
          v-if="!this.loading"
          :current-page.sync="curpage"
          :page-size="14"
          layout="total, prev, pager, next"
          @current-change="handleCurrentChange"
          @click="jumpPage(curpage)"
          :total="totalsize">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import Loading from '../commom/loading'
  import VueDate from '../commom/VueDatepickerLocal'
  let base64 = require('js-base64').Base64
  export default {
    components: {
      Loading,
      VueDate
    },
    name: 'two',
    data () {
      return {
        chcodeList: {},
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() > new Date() || time.getTime() > this.endtime
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            let temp = new Date(this.starttime.getFullYear(), this.starttime.getMonth() + 1, 1)
            if (this.endtime.getMonth() === new Date().getMonth()) {
              return time.getTime() > new Date() || time.getTime() < this.starttime
            } else {
              return time.getTime() > new Date(temp.getTime() - 1000 * 60 * 60 * 24) || time.getTime() < this.starttime
            }
          }
        },
        isnone: false,
        querying: false,  // 是否在查询
        loading: true,
        balance: '',  // 备用金余额
        lasttime: '',  // 最新修改时间
        starttime: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0),
        endtime: new Date(),
        range: [new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0), new Date()],
        curpage: 0,
        totalsize: 0,
        allpage: 0
      }
    },
    computed: {
      id () {
        return window.sessionStorage.getItem('id')
      },
      meno () {
        return base64.decode(window.sessionStorage.getItem('meno'))
      },
      url () {
        return 'http://localhost:8088/channel/byjlog/downBYJInfoLog?id=' + this.id + '&startDate=' + this.$utils.getFormat(this.starttime) + '&endDate=' + this.$utils.getFormat(this.endtime)
      }
    },
    created () {
      this.getData()
    },
    methods: {
      disdate () {
        console.log(this.starttime.getMonth())
        console.log(this.endtime.getMonth())
        if (this.starttime.getMonth() !== this.endtime.getMonth()) {
          let temp = new Date(this.starttime.getFullYear(), this.starttime.getMonth() + 1, 1)
          console.log(temp)
          this.endtime = new Date(this.starttime.getFullYear(), this.starttime.getMonth(), new Date(temp.getTime() - 1000 * 60 * 60 * 24).getDate(), 0, 0, 0)
          console.log(this.endtime)
        }
      },
      // 运营商判断
      Operator (param) {
        let temp = ''
        switch (param) {
          case 1:
            temp = '联通'
            break
          case 2:
            temp = '移动'
            break
          default:
            temp = '电信'
            break
        }
        return temp
      },
      // 流量包类型判断
      productType (param) {
        let temp = ''
        switch (param) {
          case 1:
            temp = '全国流量包'
            break
          case 2:
            temp = '本地流量包'
            break
          case 3:
            temp = '全国漫游包'
            break
          case 4:
            temp = '本地日包'
            break
          case 5:
            temp = '全国省内包'
            break
          case 6:
            temp = '本地三日包'
            break
          case 7:
            temp = '本地七日包'
            break
          case 8:
            temp = '漫游日包'
            break
          case 9:
            temp = '漫游三日包'
            break
          case 10:
            temp = '20天本地包'
            break
        }
        return temp
      },
      // 初始化数据
      getData () {
        this.$ajax.get('/channel/info/getLastRunLog', {
          params: {
            id: this.id
          }
        })
          .then((res) => {
            console.log(res)
            console.log(res.data.date)
            if (res.data.date.byjChannelInfoLogList[0]) {
              console.log('inserttime' + res.data.date.byjChannelInfoLogList[0].inserttime)
              this.lasttime = res.data.date.byjChannelInfoLogList[0].inserttime
            } else {
              console.log('updatetime' + res.data.date.updatetime)
              this.lasttime = res.data.date.updatetime
            }
            this.balance = res.data.date.totalmoney
          })
      },
      // 扣款日志查询
      getAll () {
        console.log(this.$utils.getFormat(this.starttime))
        console.log(this.$utils.getFormat(this.endtime))
        this.querying = true // 正在查询
        this.loading = true
        this.$ajax.get('/channel/byjlog/getBYJInfoLog', {
          params: {
            id: this.id,
            startDate: this.$utils.getFormat(this.starttime),
            endDate: this.$utils.getFormat(this.endtime),
            pageNo: 0,
            pageSize: 14
          }
        })
          .then((res) => {
            console.log(res.data)
            console.log(res.data.date)
            if (res.data.code === '0000') {
              if (res.data.date.list[0]) {
                this.isnone = false
                this.chcodeList = res.data.date.list
                this.curpage = parseInt(res.data.date.pageNum)
                this.totalsize = parseInt(res.data.date.total)
                this.allpage = res.data.date.pages
              } else {
                this.isnone = true
                this.curpage = 0
                this.totalsize = 0
                this.allpage = 0
              }
              this.loading = false
            }
          })
      },
      // 获取点击的当前页
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.curpage = val
        this.jumpPage(val)
      },
      // 跳转到某页面
      jumpPage (cur) {
        this.loading = true
        console.log('cur' + cur)
        this.$ajax.get('/channel/byjlog/getBYJInfoLog', {
          params: {
            id: this.id,
            startDate: this.$utils.getFormat(this.starttime),
            endDate: this.$utils.getFormat(this.endtime),
            pageNo: cur,
            pageSize: 14
          }
        })
          .then((res) => {
            console.log(res.data)
            console.log(res.data.date)
            if (res.data.code === '0000') {
              this.chcodeList = res.data.date.list
              this.curpage = parseInt(res.data.date.pageNum)
              this.totalsize = parseInt(res.data.date.total)
              this.allpage = res.data.date.pages
              this.loading = false
            }
          })
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/base.css";


</style>
