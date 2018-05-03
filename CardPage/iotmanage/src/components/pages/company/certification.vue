<template>
  <div class="wrapper">
    <section class="last">
      <header>
        <span>企业信息认证</span>
      </header>
      <div class="main-content">
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
            <span>企业名称：</span>
            <div class="half">
              <el-input type="primary" size="mini" v-model="query.companyname" placeholder="企业名称" @keyup.enter.native="queryCompany"></el-input>
            </div>
          </div>
          <!--<div class="inline">-->
          <!--<span>状态：</span>-->
          <!--<el-radio-group v-model="query.status" size="mini">-->
          <!--&lt;!&ndash;<el-radio-button label="">全部</el-radio-button>&ndash;&gt;-->
          <!--<el-radio-button label="0">待办</el-radio-button>-->
          <!--<el-radio-button label="1">已办</el-radio-button>-->
          <!--</el-radio-group>-->
          <!--</div>-->
          <div class="inline">
            <el-button class="button" type="primary" size="mini" :disabled="loading" @click="queryCompany">查询</el-button>
          </div>
        </div>
        <el-tabs v-model="query.status" type="card" @tab-click="handleClick">
          <el-tab-pane label="待办" name="3" style="margin-bottom: 20px" v-loading="loading" element-loading-text="拼命加载中">
            <el-table :data="certData" border size="small" class="tab-table">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" inline class="demo-table-expand">
                    <!--<el-form-item label="工商营业执照注册号">-->
                    <!--<span>{{ props.row.companyRegNo }}</span>-->
                    <!--</el-form-item>-->
                    <el-form-item label="营业执照">
                      <img class="zoom-in" :src="baseURL + props.row.companyLicense" width="100" @click="magnify($event)"/>
                    </el-form-item>
                    <el-form-item label="法人身份证正面照">
                      <img class="zoom-in" :src="baseURL + props.row.legalFullFace" width="100" @click="magnify($event)"/>
                    </el-form-item>
                    <el-form-item label="法人身份证反面照">
                      <img class="zoom-in" :src="baseURL + props.row.legalSideFace" width="100" @click="magnify($event)"/>
                    </el-form-item>
                    <!--<el-form-item label="手机号">-->
                    <!--<span>{{ props.row.companyMobile }}</span>-->
                    <!--</el-form-item>-->
                    <el-form-item label="电子邮箱">
                      <span>{{ props.row.companyEmail }}</span>
                    </el-form-item>
                    <!--<el-form-item label="法人姓名">-->
                    <!--<span>{{ props.row.legalName }}</span>-->
                    <!--</el-form-item>-->
                    <el-form-item label="法人身份证号">
                      <span>{{ props.row.legalCardNo }}</span>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="insertDate" label="申请日期"></el-table-column>
              <el-table-column prop="companyName" label="企业名称"></el-table-column>
              <el-table-column prop="custAccount" label="客户账号"></el-table-column>
              <el-table-column prop="companyRegNo" label="营业执照注册号"></el-table-column>
              <!--<el-table-column label="企业工商营业执照" width="120px">-->
              <!--<template slot-scope="scope">-->
              <!--<img class="zoom-in" :src="scope.row.companyLicense" width="100" @click="magnify(scope.row.companyLicense)"/>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column prop="companyMobile" label="手机号"></el-table-column>
              <!--<el-table-column prop="companyEmail" label="电子邮箱"></el-table-column>-->
              <el-table-column prop="legalName" label="法人姓名"></el-table-column>
              <!--<el-table-column prop="legalCardNo" label="法人身份证号"></el-table-column>-->
              <!--<el-table-column label="法人身份证正面照" width="120px">-->
              <!--<template slot-scope="scope">-->
              <!--<img class="zoom-in" :src="scope.row.legalFullFace" width="100" @click="magnify(scope.row.legalFullFace)"/>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column label="法人身份证反面照" width="120px">-->
              <!--<template slot-scope="scope">-->
              <!--<img class="zoom-in" :src="scope.row.legalSideFace" width="100" @click="magnify(scope.row.legalSideFace)"/>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="isAgree" label="是否同意合同"></el-table-column>-->
              <!--<el-table-column prop="contractContent" label="合同内容"></el-table-column>-->
              <el-table-column label="操作" width="77px">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="certificate(scope.row)">审核</el-button>
                  <!--<el-button type="danger" size="mini" @click="certificate(scope.row)">审核不通过</el-button>-->
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
          <el-tab-pane label="已办" name="1" style="margin-bottom: 20px" v-loading="loading" element-loading-text="拼命加载中">
            <el-table :data="certData" border size="small" class="tab-table">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="right" inline class="demo-table-expand">
                    <el-form-item label="营业执照">
                      <img class="zoom-in" :src="baseURL + props.row.companyLicense" width="100" @click="magnify($event)"/>
                    </el-form-item>
                    <el-form-item label="法人身份证正面照">
                      <img class="zoom-in" :src="baseURL + props.row.legalFullFace" width="100" @click="magnify($event)"/>
                    </el-form-item>
                    <el-form-item label="法人身份证反面照">
                      <img class="zoom-in" :src="baseURL + props.row.legalSideFace" width="100" @click="magnify($event)"/>
                    </el-form-item>
                    <el-form-item label="营业执照注册号">
                      <span>{{ props.row.companyRegNo }}</span>
                    </el-form-item>
                    <el-form-item label="法人姓名">
                      <span>{{ props.row.legalName }}</span>
                    </el-form-item>
                    <el-form-item label="法人身份证号">
                      <span>{{ props.row.legalCardNo }}</span>
                    </el-form-item>
                    <el-form-item label="手机号">
                    <span>{{ props.row.companyMobile }}</span>
                    </el-form-item>
                    <el-form-item label="电子邮箱">
                      <span>{{ props.row.companyEmail }}</span>
                    </el-form-item>
                    <!--<el-form-item label="审核意见">-->
                      <!--<span>{{ props.row.enterprizeInfoAudit.contractContent }}</span>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="审核备注">-->
                      <!--<span>{{ props.row.enterprizeInfoAudit.meno }}</span>-->
                    <!--</el-form-item>-->
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column prop="insertTime" label="申请时间"></el-table-column>
              <el-table-column prop="companyName" label="企业名称"></el-table-column>
              <!--<el-table-column prop="companyRegNo" label="工商营业执照注册号"></el-table-column>-->
              <!--<el-table-column label="企业工商营业执照" width="120px">-->
              <!--<template slot-scope="scope">-->
              <!--<img class="zoom-in" :src="scope.row.companyLicense" width="100" @click="magnify(scope.row.companyLicense)"/>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="companyEmail" label="电子邮箱"></el-table-column>-->
              <!--<el-table-column prop="legalName" label="法人姓名"></el-table-column>-->
              <el-table-column prop="custAccount" label="客户账号"></el-table-column>
              <!--<el-table-column prop="companyMobile" label="手机号"></el-table-column>-->
              <!--<el-table-column prop="legalCardNo" label="法人身份证号"></el-table-column>-->
              <!--<el-table-column label="法人身份证正面照" width="120px">-->
              <!--<template slot-scope="scope">-->
              <!--<img class="zoom-in" :src="scope.row.legalFullFace" width="100" @click="magnify(scope.row.legalFullFace)"/>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column label="法人身份证反面照" width="120px">-->
              <!--<template slot-scope="scope">-->
              <!--<img class="zoom-in" :src="scope.row.legalSideFace" width="100" @click="magnify(scope.row.legalSideFace)"/>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="isAgree" label="是否同意合同"></el-table-column>-->
              <!--<el-table-column prop="contractContent" label="合同内容"></el-table-column>-->
              <el-table-column prop="enterprizeInfoAudit.aproveResult" label="审核结果" :formatter="formatterAudit"></el-table-column>
              <el-table-column prop="enterprizeInfoAudit.contractContent" label="审核意见"></el-table-column>
              <el-table-column prop="enterprizeInfoAudit.meno" label="审核备注"></el-table-column>
              <el-table-column prop="enterprizeInfoAudit.approveName" label="审核人"></el-table-column>
              <el-table-column prop="enterprizeInfoAudit.insertTime" label="审核日期"></el-table-column>
              <!--<el-table-column label="操作" width="77px">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button type="primary" size="mini" @click="certificate(scope.row)">详情</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
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
      </div>
    </section>
    <el-dialog title="审核企业信息" width="400px" top="14%" :visible.sync="dialogShow"
               :show-close="falseMean" v-bind:close-on-click-modal="falseMean" :close-on-press-escape="falseMean">
      <el-form :model="dialogForm">
        <el-form-item label="是否通过审核" :label-width="dialogWidth">
          <el-radio-group v-model="dialogForm.authenticStatus">
            <el-radio label="1">审核通过</el-radio>
            <el-radio label="3">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input type="textarea" size="mini" v-model="dialogForm.content"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" size="mini" v-model="dialogForm.meno"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" :disabled="disabled.submit" @click="dialogShow = false">取 消</el-button>
        <el-button size="mini" type="primary" :disabled="disabled.submit" @click="confirm">
          <span v-if="!disabled.submit">确 定</span>
          <i v-else class="el-icon-loading"></i>
        </el-button>
      </div>
    </el-dialog>
    <!--<div v-show="showimg">-->
      <!--<div @click="showimg = false" style="background: #000;opacity: .5;position: absolute;top: 0;bottom: 0;left: 0;right: 0;z-index: 5"></div>-->
      <!--<img style="position: absolute;z-index: 10;top: 50%;left: 40%;margin-top: -250px;cursor: zoom-out" @click="showimg = false" :src="magnifyImg" width="500"/>-->
    <!--</div>-->
    <img-show v-show="showimg" @clickit="showimg = false" :url="magnifyImg"></img-show>
  </div>
</template>

<script>
  import imgShow from '../../common/imgshow'
  export default {
    name: "certification",
    components: {
      imgShow
    },
    data () {
      return {
        loading: false,
        falseMean: false,
        certData: [
          // {
            // id: '',
            // custId: '',
            // companyName: '',
            // companyLicense: '',
            // companyRegNo: '',
            // companyMobile: '',
            // companyEmail: '',
            // legalName: '',
            // legalCardNo: '',
            // legalFullFace: '',
            // legalSideFace: '',
            // isAgree: '',
            // contractContent: '',
            // authenticStatus: '',
            // insertDate: '',
            // insertTime: ''
          // }
        ],
        query: {
          range: [this.$date.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')],  //查询时间段，默认为至今一个月
          companyname: '',
          status: '3'  //tab-name
        },
        baseURL: 'http://127.0.0.1:9118/',
        showimg: false,
        magnifyImg: '',
        dialogID: '',
        dialogShow: false,
        dialogWidth: '100px',
        dialogForm: {
          authenticStatus: '1',
          content: '',
          meno: ''
        },
        newdialogForm: {
          authenticStatus: '1',
          content: '',
          meno: ''
        },
        //按钮禁用
        disabled: {
          submit: false,
          query: false
        },
        pagination: {
          curpage: 1,
          pagesize: 12,
          totalsize: null
        }
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData () {
        let sendForm = {
          authenticStatus: this.query.status,
          startDate: this.query.range[0],
          endDate: this.query.range[1],
          companyName: this.query.companyname,
          page: this.pagination.curpage,
          limit: this.pagination.pagesize
        }
        if (this.query.status == '1') {
          sendForm.authenticStatus = '"1","4"'
        }
        console.log('send', sendForm)
        this.loading = true
        this.$ajax.get('/caihiot/api-user/company/list', {
          params: sendForm
        })
          .then((res) => {
            if (res.data.code == '0') {
              this.loading = false
              this.certData = res.data.page.list
              this.pagination.pagesize = res.data.page.pageSize
              this.pagination.curpage = res.data.page.currPage
              this.pagination.totalsize = res.data.page.totalCount
            } else if (res.data.code == '500') {
              this.loading = false
              this.$message.error(res.data.msg)
            }
          })
          .catch((err) => {
            this.loading = false
            console.log(err)
          })
      },
      handleClick (tab, event) {
        this.certData = []
        this.pagination.curpage = 1
        this.loadData()
      },
      queryCompany () {
        this.pagination.curpage = 1
        this.loadData()
      },
      certificate (row) {
        console.log(row)
        this.dialogID = row.id
        this.dialogShow = true
        this.disabled.submit = false
        this.dialogForm = this.newdialogForm
        // this.$router.push({name: 'companydetail', params: {id: row.id}})
      },
      magnify (e) {
        this.magnifyImg = e.target.currentSrc
        this.showimg = true
      },
      // viewImg () {
      //   this.showimg = false
      // },
      confirm () {
        console.log('this.dialogID', this.dialogID)
        this.disabled.submit = true
        this.$ajax({
          method: 'post',
          url: '/caihiot/api-user/company/audit',
          data: {
            id: this.dialogID,
            aproveResult: this.dialogForm.authenticStatus,
            contractContent: this.dialogForm.content,
            meno: this.dialogForm.meno
          }
        })
          .then((res) => {
            console.log(res)
            if (res.data.code == '0') {
              this.disabled.submit = true
              this.$message.success('提交审核成功')
              this.dialogShow = false
              this.loadData()
            } else if (res.data.code == '500') {
              this.disabled.submit = true
              this.$message.error(res.data.msg)
              this.dialogShow = false
              this.loadData()
            }
          })
          .catch((err) => {
            console.log(err)
            this.dialogShow = false
            this.loadData()
          })
      },
      //分页请求数据
      handleCurrentChange (val) {
        console.log('val', val)
        this.pagination.curpage = val
        this.loadData()
      },
      formatterAudit (row, column, cellValue) {
        return cellValue == '1'?'已通过':'未通过'
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";
</style>
