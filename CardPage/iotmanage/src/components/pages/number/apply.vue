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
              <span>客户账号：</span>
              <div class="half">
                <el-input size="mini" placeholder="客户账号" v-model="query.custAccount" @keyup.enter.native="queryNum" ></el-input>
              </div>
            </div>
            <div class="inline">
              <el-button class="button" type="primary" size="mini" :disabled="loading" @click="queryNum">查询</el-button>
            </div>
          </div>
          <el-tabs v-model="query.status" type="card" @tab-click="handleClick">
            <el-tab-pane label="待办" name="1" style="margin-bottom: 20px" v-loading="loading" element-loading-text="拼命加载中">
              <el-table :data="applyData" border size="small" style="width: 100%">
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
                <el-table-column prop="insertTime" width="140px" label="日期"></el-table-column>
                <el-table-column prop="id" label="流水号"></el-table-column>
                <el-table-column prop="custAccount" label="客户账号"></el-table-column>
                <el-table-column prop="cardNum" label="号码数量" width="140px"></el-table-column>
                <el-table-column label="操作" width="147px">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="agree(scope.row)">同意</el-button>
                    <el-button type="danger" size="mini" @click="refuse(scope.row)">拒绝</el-button>
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
            </el-tab-pane>
            <el-tab-pane label="已办" name="2" style="margin-bottom: 20px" v-loading="loading" element-loading-text="拼命加载中">
              <el-table :data="applyData" border size="small" style="width: 100%">
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
                <el-table-column prop="insertTime" width="140px" label="日期"></el-table-column>
                <el-table-column prop="id" label="流水号"></el-table-column>
                <el-table-column prop="custAccount" label="客户账号"></el-table-column>
                <el-table-column prop="cardNum" label="号码数量" width="100px"></el-table-column>
                <el-table-column prop="flowStatusDesc.desc" label="申请状态" width="150px">
                  <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.flowStatusDesc.desc }}</el-tag>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="applyCompany" label="申请厂商" :formatter="nullPlaceHolder"></el-table-column>
                <el-table-column label="操作" width="77px">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="detail(scope.row)" v-if="scope.row.flowState == '2'">详情</el-button>
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
            </el-tab-pane>
          </el-tabs>
          <el-dialog title="申请号码详情" :visible.sync="dialogTableVisible">
            <div v-loading="dialogShow" element-loading-text="拼命加载中">
              <el-table id="dialogTable" :data="gridData" >
                <el-table-column prop="cardNo" label="卡号" min-width="100px"></el-table-column>
                <el-table-column prop="imis" label="IMIS" min-width="130px"></el-table-column>
                <el-table-column prop="iccid" label="ICCID" min-width="150px"></el-table-column>
                <el-table-column prop="cardStatusDesc.desc" label="当前状态" min-width="80px"></el-table-column>
                <el-table-column prop="insertTime" label="出厂时间" min-width="135px"></el-table-column>
              </el-table>
              <div class="foot-page">
                <el-pagination
                  @current-change="handleCurrentChangeDialog"
                  :current-page="paginationDialog.curpage"
                  :page-size="paginationDialog.pagesize"
                  layout="total, prev, pager, next, jumper"
                  :total="paginationDialog.totalsize">
                </el-pagination>
              </div>
            </div>
          </el-dialog>
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
        showPopover: false,
        dialogTableVisible: false,
        query: {
          range: [this.$date.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')],  //查询时间段，默认为至今一个月
          companyname: '',
          status: '1',
          custAccount: ''
        },
        applyForm: {
          applyCompany: '',
        },
        newApplyForm: {
          applyCompany: ''
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
          totalsize: 0
        },
        paginationDialog: {
          curpage: 1,
          pagesize: 6,
          totalsize: 0
        },
        dialogId: '',
        dialogShow: false,
        gridData: []
      }
    },
    created () {
      this.queryNum()
    },
    methods: {
      nullPlaceHolder (row, column, cellValue, index) {
        if (!cellValue) {
          return "暂无"
        } else {
          return cellValue
        }
      },
      statusFormatter (row, column, cellValue, index) {

      },
      handleClick (tab, event) {
        this.certData = []
        this.pagination.curpage = 1
        this.queryNum()
      },
      queryNum () {
        this.loading = true
        let flowStateEx = "1"
        if (this.query.status == "2") {
          flowStateEx = '"2","3"'
        }
        this.$ajax.get('/caihiot/api-card/card/applyauerybydate', {
          params: {
            fistDate: this.query.range[0],
            endDate: this.query.range[1],
            page: this.pagination.curpage,
            limit: this.pagination.pagesize,
            custAccount: this.query.custAccount,
            flowState: flowStateEx
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
      agree (row) {
        console.log(row)
        this.$messageBox.prompt('请输入申请厂商', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value) {
            this.$ajax.get("/caihiot/api-card/card/applyOperate/" + row.id, {
              params: {
                applyCompany: value
              }
            })
              .then((res) => {
                console.log(res.data)
                this.$message.success("申请成功")
                this.queryNum()
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            this.$message.error("申请厂商不可为空")
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      refuse (row) {
        console.log(row)
        this.$messageBox.confirm('确认拒绝此号码申请？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get("/caihiot/api-card/card/applyRefuse/" + row.id)
            .then((res) => {
              console.log(res.data)
              this.$message.success("拒绝申请成功")
              this.queryNum()
            })
            .catch((err) => {
              console.log(err)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消拒绝'
          });
        });
      },
      handleCurrentChange (val) {
        console.log('val', val)
        this.pagination.curpage = val
        this.queryNum()
      },
      handleCurrentChangeDialog (val) {
        console.log('val', val)
        this.paginationDialog.curpage = val
        this.detail(this.dialogId)
      },
      detail (row) {
        this.dialogId = row.id
        this.dialogShow = true
        this.dialogTableVisible = true
        this.$ajax.get('/caihiot/api-card/card/querybyflowid', {
          params: {
            flowId: this.dialogId
          }
        })
          .then((res) => {
            console.log(res.data)
            this.gridData = res.data.list.list
            this.paginationDialog.totalsize = res.data.list.totalCount
            this.paginationDialog.pagesize = res.data.list.pageSize
            this.paginationDialog.curpage = res.data.list.currPage
          })
          .catch((err) => {
            console.log(err)
          })
        this.dialogShow = false
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";
</style>
