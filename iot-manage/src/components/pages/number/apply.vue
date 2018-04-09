<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>号码申请管理</span>
        </header>
        <div class="main-content">
          <div class="option">
            <div class="inline">
              <!--<span class="option-span">到期时间：</span>-->
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
              <el-button class="button" type="primary" size="mini" :disabled="loading" @click="queryNum">查询</el-button>
            </div>
          </div>
          <div v-loading="loading" element-loading-text="拼命加载中">
            <el-table :data="applyData" border size="small" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" inline class="demo-table-expand">
                    <el-form-item label="卡制式">
                      <span>{{ props.row.cardType }}</span>
                    </el-form-item>
                    <el-form-item label="sim卡类型">
                      <span>{{ props.row.simtype }}</span>
                    </el-form-item>
                    <el-form-item label="测试期">
                      <span>{{ props.row.testPeriodType }}</span>
                    </el-form-item>
                    <el-form-item label="预制套餐挡位">
                      <span>{{ props.row.comboType }}</span>
                    </el-form-item>
                    <el-form-item label="预制套餐时长">
                      <span>{{ props.row.comboTime }}</span>
                    </el-form-item>
                    <el-form-item label="是否开启短信">
                      <span>{{ props.row.isSms }}</span>
                    </el-form-item>
                    <el-form-item label="收件人">
                      <span>{{ props.row.receName }}</span>
                    </el-form-item>
                    <el-form-item label="收件号码">
                      <span>{{ props.row.receiveNo }}</span>
                    </el-form-item>
                    <el-form-item label="收件地址">
                      <span>{{ props.row.receiveAddress }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="insertDate" label="日期"></el-table-column>
              <el-table-column prop="flowId" label="流水号"></el-table-column>
              <el-table-column prop="custAccount" label="客户账号"></el-table-column>
              <el-table-column prop="cardNum" label="号码数量"></el-table-column>
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
    name: "apply",
    data () {
      return {
        loading: false,
        query: {
          range: [this.$date.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')],  //查询时间段，默认为至今一个月
          companyname: '',
          status: '0'
        },
        applyData: [
          // {
            // date: '2017-01-02',
            // flowid: '2132321321',
            // account: 'lixiang@qq.com',
            // amount: '23',  //号码数量
            // operator: '1',  //卡制式
            // simtype: '1',  //SIM卡类型
            // // networktype: '1',  //网络制式
            // testtime: '1',  //测试期
            // prelevel: '1',  //预制套餐挡位
            // message: '1',  //短信
            // pretime: '1',  //预制套餐时长
            // recipient: 'cc',  //收件人
            // // slienttime: '',  //沉默期
            // telephone: 'cc',  //收件号码
            // address: 'ccc'  //收件地址
          // }
        ],
        pagination: {
          curpage: 1,
          pagesize: 12,
          totalsize: null
        }
      }
    },
    created () {
      this.queryNum()
    },
    methods: {
      queryNum () {
        this.loading = true
        this.$ajax.get('/applyquery/caihiot/querybydate', {
          params: {
            fistDate: this.query.range[0],
            endDate: this.query.range[1],
            page: this.pagination.curpage,
            limit: this.pagination.pagesize
          }
        })
          .then((res) => {
            console.log(res.data)
            this.applyData = res.data.list.list
            this.pagination.totalsize = res.data.list.totalCount
            this.pagination.pagesize = res.data.list.pageSize
            this.pagination.curpage = res.data.list.currPage
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
          })
      },
      handleCurrentChange (val) {
        console.log('val', val)
        this.pagination.curpage = val
        this.queryNum()
      },
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";
</style>
