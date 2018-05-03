<template>
  <div class="wrapper">
    <section v-loading="cardloading" element-loading-text="拼命加载中">
      <div class="card" style="border-bottom: 1px solid #e9e9e9;">
        <div class="cardthird" style="border-right: 1px solid #e9e9e9;">
          <div class="cardthirddiv">
            <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;总号码数</span>
            <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.total' :duration='2000'></count-to></p>
          </div>
        </div>
      </div>
      <!--<div class="card" style="border-bottom: 1px solid #e9e9e9;">-->
        <!--<div class="cardthird" style="border-right: 1px solid #e9e9e9;">-->
          <!--<div class="cardthirddiv">-->
            <!--<span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;测试期号码数</span>-->
            <!--<p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.test' :duration='2000'></count-to></p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="cardthird" style="border-right: 1px solid #e9e9e9;">-->
          <!--<div class="cardthirddiv">-->
            <!--<span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;沉默期号码数</span>-->
            <!--<p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.slient' :duration='2000'></count-to></p>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="cardthird">-->
          <!--<div class="cardthirddiv">-->
            <!--<span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;计费期号码数</span>-->
            <!--<p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.charge' :duration='2000'></count-to></p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
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
        <span>号码信息</span>
      </header>
      <div class="main-content">
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
              <el-option value="" label="全部"></el-option>
              <el-option v-for="(item, index) in dict.CardStatus" :label="item.desc" :value="item.code" :key="item.code"></el-option>
              <!--<el-option value="2" label="开机"></el-option>-->
              <!--<el-option value="3" label="停机"></el-option>-->
              <!--<el-option value="4" label="销户"></el-option>-->
            </el-select>
          </div>
          <div class="inline" style="margin-left: 10px">
            <el-button class="button" type="primary" size="mini" @click="queryStatus" :disabled="info.staquery">查询</el-button>
          </div>
        </div>
        <div class="result" v-loading="tableloading" element-loading-text="拼命加载中">
          <el-table :data="tableData" border size="small">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="right" inline class="demo-table-expand">
                  <el-form-item label="运营商">
                    <span>{{ props.row.cardTypeDesc.desc }}</span>
                  </el-form-item>
                  <el-form-item label="sim卡类型">
                    <span>{{ props.row.simTypeDesc.desc }}</span>
                  </el-form-item>
                  <el-form-item label="网络制式">
                    <span>{{ props.row.netTypeDesc.desc }}</span>
                  </el-form-item>
                  <el-form-item label="预制套餐挡位">
                    <span>{{ props.row.comboTypeDesc.desc }}</span>
                  </el-form-item>
                  <el-form-item label="预制套餐时长">
                    <span>{{ props.row.comboTimeDesc.desc }}</span>
                  </el-form-item>
                  <el-form-item label="是否开启短信">
                    <span>{{ props.row.isSms == '1'?'开启':'关闭' }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="cardNo" label="卡号" width="100px"></el-table-column>
            <el-table-column prop="imis" label="IMIS" width="130px"></el-table-column>
            <el-table-column prop="iccid" label="ICCID"></el-table-column>
            <!--<el-table-column prop="address" label="设备SN"></el-table-column>-->
            <!--<el-table-column prop="address" label="与设备唯一绑定"></el-table-column>-->
            <el-table-column prop="cardStatusDesc.desc" label="当前状态" width="80px"></el-table-column>
            <el-table-column prop="applyCompany" label="厂商"></el-table-column>
            <el-table-column prop="insertTime" label="出厂时间" width="135px"></el-table-column>
          </el-table>
          <div class="foot-page">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pagination.curpage"
              :page-size="pagination.pagesize"
              layout="total, prev, pager, next, jumper"
              :total="pagination.totalsize">
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
              :total="0">
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
            total: 0,  //总号码数
            // test: 1000,  //测试期号码
            // slient: 400,  //沉默期号码
            // charge: 500,  //计费期号码
            start: 0,  //开机号码
            startpercent: 0,  //在网率
            stop: 0,  //停机号码
            stoppercent: 0,  //停机率
            destroy: 0,  //销户号码
            destroypercent: 0  //销户率
          },
          //信息section
          changeshow: false,  //tab切换，默认为显示号码信息
          //号码信息
          info: {
            numquery: true,
            staquery: true,
            number: '',  //查询号码
            status: ''  //查询状态
          },
          //测试/沉默期期限
          deadline: {
            time: this.$date.formatDate(new Date(), 'yyyy-MM-dd'),  //到期时间
            status: '0'  //号码状态
          },
          tableData: [],
          pagination: {
            curpage: 1,
            pagesize: 10,
            totalsize: 0
          },
          dict: {
            CardStatus: []
          }
        }
      },
      computed: {
        toInt (s) {
          return Math.round(parseFloat(s)*10000)
        }
      },
      mounted () {
        let n = (1/6).toString()
        console.log("n", n)
        let s = parseFloat(n) * 100
        console.log("s", s)
        console.log("nnnnn", Math.round(1/6*10000)/100)
      },
      created () {
        this.getCardStatus()
        this.loadData()
      },
      methods: {
        getCardStatus () {
          this.$http.get('/caihiot/api-card/dict/list/10')
            .then((res) => {
              console.log(res)
              this.dict.CardStatus = res.dict
            })
            .catch((err) => {
              console.log(err)
            })
        },
        change (index) {  //tab切换
          if (index == 1) {
            this.changeshow = false
          } else if (index == 2) {
            this.changeshow = true
          }
        },
        loadData () {
          this.cardloading = true
          this.$ajax.get('/caihiot/api-card/card/allinfo')
            .then((res) => {
              console.log(res)
              if (res.data.code == '0') {
                this.card.start = res.data.list[0]
                this.card.startpercent = res.data.list[0]/res.data.list[3]*100
                this.card.stop = res.data.list[1]
                this.card.stoppercent = res.data.list[1]/res.data.list[3]*100
                this.card.destroy = res.data.list[2]
                this.card.destroypercent = res.data.list[2]/res.data.list[3]*100
                this.card.total = res.data.list[3]
              } else {
                this.$message.error(res.data.msg)
              }
              this.cardloading = false
            })
            .catch((err) => {
              console.log(err)
            })
        },
        queryNum () {  //号码查询
          if (this.info.number) {
            this.tableloading = true
            this.$ajax.get('/caihiot/api-card/card/querybynumber', {
              params: {
                number: this.info.number
              }
            })
              .then((res) => {
                console.log(res)
                if (res.data.code == '0') {
                  this.tableData = res.data.list
                  if (this.tableData.length === 1) {
                    this.pagination.totalsize = 1
                  } else {
                    this.pagination.totalsize = 0
                  }
                } else {
                  this.$message.error(res.data.msg)
                }
                this.tableloading = false
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            this.$message.error('请输入要查询的卡号或IMSI或ICCID')
          }
        },
        queryStatus () {  //状态查询
          this.tableloading = true
          this.$ajax.get('/caihiot/api-card/card/querybystatus', {
            params: {
              cardStatus: this.info.status,
              page: this.pagination.curpage,
              limit: this.pagination.pagesize
            }
          })
            .then((res) => {
              console.log(res)
              if (res.data.code == '0') {
                this.tableData = res.data.list.list
                this.pagination.totalsize = res.data.list.totalCount
                this.pagination.pagesize = res.data.list.pageSize
                this.pagination.curpage = res.data.list.currPage
              } else {
                this.$message.error(res.data.msg)
              }
              this.tableloading = false
            })
            .catch((err) => {
              console.log(err)
            })
        },
        queryDeadLine () {
          console.log(this.deadline)
        },
        //分页按钮
        handleCurrentChange (val) {
          console.log('val')
          console.log(val)
          this.pagination.curpage = val
          this.queryStatus()
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
