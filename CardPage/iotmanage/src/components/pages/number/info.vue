<template>
  <div class="wrapper">
    <section class="last">
      <header>
        <span>号码信息管理</span>
      </header>
      <div class="main-content">
        <div class="option">
          <div class="inline">
            <span>客户账户：</span>
            <div class="half">
              <el-input size="mini" placeholder="客户账户" v-model="info.custAccount"></el-input>
            </div>
          </div>
          <div class="inline" @mouseenter="info.numquery = false" @mouseleave="info.numquery = true">
            <span>卡号/IMSI/ICCID：</span>
            <div class="half" style="width: 176px">
              <el-input size="mini" placeholder="卡号/IMSI/ICCID" v-model="info.number" @keyup.enter.native="queryCard" ></el-input>
            </div>
            <div class="inline" style="margin-left: 10px">
              <el-button class="button" type="primary" size="mini" @click="queryCard" :disabled="info.numquery">查询</el-button>
            </div>
          </div>
          <!--<div class="inline">-->
            <!--<el-button class="button" type="primary" size="mini" @click="queryCard" :disabled="info.numquery">查询</el-button>-->
          <!--</div>-->
          <div class="inline" style="margin-left: 20px" @mouseenter="info.staquery = false" @mouseleave="info.staquery = true">
            <span>号码状态：</span>
            <div class="half" style="width: 176px">
              <el-select size="mini" v-model="info.status">
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
        </div>
        <div class="result" v-loading="loading" element-loading-text="拼命加载中" v-show="showTable">
          <el-table :data="cardData" border size="small" style="width: 100%">
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
            <el-table-column prop="custAccount" label="客户账号"></el-table-column>
            <el-table-column prop="cardNo" label="卡号" min-width="100px"></el-table-column>
            <el-table-column prop="imis" label="IMIS" min-width="130px"></el-table-column>
            <el-table-column prop="iccid" label="ICCID" min-width="150px"></el-table-column>
            <!--<el-table-column prop="address" label="设备SN"></el-table-column>-->
            <!--<el-table-column prop="address" label="与设备唯一绑定"></el-table-column>-->
            <el-table-column prop="cardStatusDesc.desc" label="当前状态" min-width="80px"></el-table-column>
            <el-table-column prop="applyCompany" label="厂商"></el-table-column>
            <el-table-column prop="insertTime" label="出厂时间" min-width="135px"></el-table-column>
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
    </section>
  </div>
</template>

<script>
  export default {
    name: "info",
    data () {
      return {
        loading: false,
        showTable: false,
        info: {
          numquery: true,
          staquery: true,
          custAccount: '',
          number: '',  //查询号码
          status: ''  //查询状态
        },
        cardData: [],
        pagination: {
          curpage: 1,
          pagesize: 12,
          totalsize: 0
        },
        dict: {
          CardStatus: []
        }
      }
    },
    created () {
      // this.queryCard()
      this.getCardStatus()
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
      queryCard () {
        if (this.info.number) {
          this.loading = true
          this.showTable = true
          this.info.status = ''
          this.$ajax.get('/caihiot/api-card/card/querybynumber', {
            params: {
              number: this.info.number,
              custAccount: this.info.custAccount
            }
          })
            .then((res) => {
              console.log(res)
              if (res.data.code == '0') {
                this.cardData = res.data.list
                if (this.cardData.length === 1) {
                  this.pagination.totalsize = 1
                } else {
                  this.pagination.totalsize = 0
                }
              } else {
                this.$message.error(res.data.msg)
              }
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.$message.error('请输入要查询的卡号或IMSI或ICCID')
        }
      },
      queryStatus () {
        this.loading = true
        this.showTable = true
        this.info.number = ''
        this.$ajax.get('/caihiot/api-card/card/querybystatus', {
          params: {
            cardStatus: this.info.status,
            custAccount: this.info.custAccount,
            page: this.pagination.curpage,
            limit: this.pagination.pagesize
          }
        })
          .then((res) => {
            console.log(res)
            if (res.data.code == '0') {
              this.cardData = res.data.list.list
              this.pagination.totalsize = res.data.list.totalCount
              this.pagination.pagesize = res.data.list.pageSize
              this.pagination.curpage = res.data.list.currPage
            } else {
              this.$message.error(res.data.msg)
            }
            this.loading = false
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
        this.queryStatus()
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";
</style>
