<template>
    <div class="wrapper">
      <section>
        <header>
          <span>号码申请详情</span>
        </header>
        <div class="main-content" v-loading="loading.top" element-loading-text="拼命加载中">
          <table class="detailtable">
            <tr>
              <td width="50%">号码数量：{{applydetail.cardNum}}</td>
              <td width="50%">运营商：{{applydetail.cardTypeDesc.desc}}</td>
            </tr>
            <tr>
              <td>SIM卡类型：{{applydetail.simTypeDesc.desc}}</td>
              <td>网络制式：{{applydetail.netTypeDesc.desc}}</td>
            </tr>
            <tr>
              <td>预制套餐挡位：{{applydetail.comboTypeDesc.desc}}</td>
              <td>预制套餐时长：{{applydetail.comboTimeDesc.desc}}</td>
            </tr>
            <tr>
              <td>短信：{{applydetail.isSms == "1"?"开启":"关闭"}}</td>
              <td>申请厂商：{{applydetail.applyCompany?applydetail.applyCompany:"暂无"}}</td>
            </tr>
            <tr>
              <td>收件人：{{applydetail.receName}}</td>
              <td>收件号码：{{applydetail.receiveNo}}</td>
            </tr>
            <tr>
              <td colspan="2">收件地址：{{applydetail.receiveAddress}}</td>
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
          <div class="option">
            <div class="inline">
              <el-date-picker
                v-model="record.range"
                size="mini"
                type="daterange"
                :picker-options="pickerOptions"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"></el-date-picker>
            </div>
            <div class="inline">
              <el-button class="button" type="primary" size="mini" @click="applyOperateQuery">查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="loading.bottom" element-loading-text="拼命加载中">
            <el-table :data="operateData" border size="small">
              <el-table-column prop="insertTime" label="操作时间"></el-table-column>
              <el-table-column prop="applyContentDesc.desc" label="操作内容"></el-table-column>
              <el-table-column prop="applyName" label="操作人" align="center" class-name="download">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>手机号码: {{ scope.row.tUserEntity.mobile }}</p>
                    <p>电子邮箱: {{ scope.row.tUserEntity.email }}</p>
                    <div slot="reference" class="name-wrapper">
                      <span>{{ scope.row.applyName }}</span>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
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
          download: 'download',
          loading: {
            top: false,
            bottom: false
          },
          detailId: '',
          applydetail: {
            cardNum: '',  //号码数量
            cardType: '1',  //卡制式
            simType: '1',  //SIM卡类型
            netType: '1',  //网络制式
            testPeriodType: '1',  //测试期
            comboType: '1',  //预制套餐挡位
            isSms: '1',  //短信
            comboTime: '1',  //预制套餐时长
            receName: '',  //收件人
            // slienttime: '',  //沉默期
            receiveNo: '',  //收件号码
            receiveAddress: ''  //收件地址
          },
          pickerOptions: {
            disabledDate: (time) => {
              return time.getTime() > new Date() || time.getTime() < new Date(2018, 0, 1);
            }
          },
          record: {
            range: [this.$date.formatDate(new Date(new Date().setDate(1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')]  //查询时间段，默认为至今一个月
          },
          operateData: [],
          pagination: {
            curpage: 1,
            pagesize: 10,
            totalsize: 100
          }
        }
      },
      created () {
        this.detailId = this.$route.params.id
        console.log(this.detailId)
        this.loadData()
        this.applyOperateQuery()
      },
      methods: {
        loadData () {
          this.loading.top = true
          this.$ajax.get('/caihiot/api-card/card/applyquerybyflowid', {
            params: {
              flowId: this.detailId
            }
          })
            .then((res) => {
              console.log(res.data)
              this.applydetail = res.data.tCustApply
              this.loading.top = false
            })
            .catch((err) => {
              console.log(err)
              this.loading.top = false
            })
        },
        applyOperateQuery () {
          this.loading.bottom = true
          this.$ajax.get('/caihiot/api-card/card/operatequery/' + this.detailId, {
            params: {
              fistDate: this.record.range[0],
              endDate: this.record.range[1],
              page: this.pagination.curpage,
              limit: this.pagination.pagesize
            }
          })
            .then((res) => {
              console.log(res.data)
              this.operateData = res.data.list.list
              this.pagination.totalsize = res.data.list.totalCount
              this.pagination.pagesize = res.data.list.pageSize
              this.pagination.curpage = res.data.list.currPage
              this.loading.bottom = false
            })
            .catch((err) => {
              console.log(err)
              this.loading.bottom = false
            })
        },
        //分页按钮
        handleCurrentChange (val) {
          console.log('val')
          console.log(val)
          this.pagination.curpage = val
          this.applyOperateQuery()
        },
        goback () {
          this.$router.push('/home/apply')
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";

</style>
