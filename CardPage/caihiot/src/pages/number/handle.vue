<template>
    <div class="wrapper">
      <section class="first">
        <header>
          <span>号码操作</span>
        </header>
        <div class="main-content">
          <!--<div class="form-group-half">-->
            <!--<div class="from-span"><span>请输入号码</span></div>-->
            <!--<div class="half">-->
              <!--<el-input size="mini" placeholder="请输入11位号码" v-model="number"></el-input>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="form-group-half">-->
            <!--<div style="display: inline-block;width: 200px">-->
              <!--<a class="download" :href="downloadUrl"><i class="el-icon-download"></i> 下载示例文档</a>-->
            <!--</div>-->
            <!--<div class="half" style="margin-bottom: 10px">-->
              <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--action="http://localhost:9391/api-user/company/uploadFile"-->
                <!--multiple-->
                <!--:limit="3"-->
                <!--:file-list="fileList">-->
                <!--<el-button size="mini" type="primary"><i class="el-icon-upload"></i>&nbsp;&nbsp;点击上传</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过2M</div>-->
              <!--</el-upload>-->
            <!--</div>-->
          <!--</div>-->
          <div class="form-group-half" style="float: left">
            <p class="form-p">单号码操作：</p>
            <div style="margin-bottom: 16px">
              <div class="half">
                <el-input placeholder="请输入11位号码" size="mini" v-model="number"></el-input>
              </div>
              <!--<div class="quarter alert-warning">-->
                <!--<div><i class="el-icon-warning"></i> 请输入11位或13位号码</div>-->
              <!--</div>-->
            </div>
            <div>
              <el-button size="mini" type="primary" @click="operateOne(2)">激活</el-button>
              <el-button size="mini" type="primary" @click="operateOne(3)">停用</el-button>
              <el-button size="mini" type="primary" @click="operateOne(4)">销户</el-button>
            </div>
          </div>
          <div class="form-group-half" style="margin-left: 20px;width: 45%">
            <p class="form-p">多号码操作:（只能上传小于2M的txt文件）</p>
            <div style="margin-bottom: 10px">
              <el-upload
                class="upload-demo"
                ref="txtUpload"
                accept=".txt"
                :action="uploadTxt.action"
                :headers="headers"
                :http-request="submitUpload"
                :limit="uploadTxt.limit"
                :multiple="uploadTxt.falseMean"
                :auto-upload="uploadTxt.falseMean"
                :on-exceed="handleExceed"
                :before-upload="beforeHandle"
                :file-list="fileList">
                <el-button size="mini" type="primary"><i class="el-icon-upload"></i>&nbsp;&nbsp;点击上传</el-button>
              </el-upload>
            </div>
            <div style="margin-bottom: 10px">
              <a class="download" :href="downloadUrl"><i class="el-icon-download"></i> 下载示例文档</a>
            </div>
            <div>
              <el-button size="mini" type="primary" @click="batchOperate(37)">激活</el-button>
              <el-button size="mini" type="primary" @click="batchOperate(38)">停用</el-button>
              <el-button size="mini" type="primary" @click="batchOperate(39)">销户</el-button>
            </div>
          </div>
        </div>
      </section>
      <!--<section>-->
        <!--<header>-->
          <!--<span>号码自定义标签设置</span>-->
        <!--</header>-->
        <!--<div class="main-content">-->
          <!--<el-tabs v-model="tabname">-->
            <!--<el-tab-pane label="针对订单设置" name="first">-->
              <!--<div class="form-group-half">-->
                <!--<div class="from-span"><span>订单号</span></div>-->
                <!--<div class="half">-->
                  <!--<el-input size="mini" v-model="ordernum"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="form-group-half">-->
                <!--<div class="from-span"><span>下单号码0个</span></div>-->
                <!--<div class="half">-->
                  <!--<span>已导入号码0个</span>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="form-group-half">-->
                <!--<div class="from-span"><span>自定义标签</span></div>-->
                <!--<div class="half">-->
                  <!--<el-input size="mini"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="form-group-half">-->
                <!--<div class="from-span"><span>标签值</span></div>-->
                <!--<div class="half">-->
                  <!--<el-input size="mini"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="confirm-btn">-->
                <!--<el-button class="button" type="primary" size="mini">提交</el-button>-->
              <!--</div>-->
            <!--</el-tab-pane>-->
            <!--<el-tab-pane label="针对iccid设置" name="second">-->
              <!--<div class="form-group-half">-->
                <!--<div class="from-span"><span>ICCID号段</span></div>-->
                <!--<div class="half">-->
                  <!--<el-input size="mini" v-model="iccidnum"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="form-group-half alert-warning" style="width: 30%">-->
                <!--<div><i class="el-icon-warning"></i> ICCID号段为20位数字和字母组合</div>-->
              <!--</div>-->
              <!--<div class="form-group-half">-->
                <!--<div class="from-span"><span>自定义标签</span></div>-->
                <!--<div class="half">-->
                  <!--<el-input size="mini"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="form-group-half">-->
                <!--<div class="from-span"><span>标签值</span></div>-->
                <!--<div class="half">-->
                  <!--<el-input size="mini"></el-input>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="confirm-btn">-->
                <!--<el-button class="button" type="primary" size="mini">提交</el-button>-->
              <!--</div>-->
            <!--</el-tab-pane>-->
          <!--</el-tabs>-->
        <!--</div>-->
      <!--</section>-->
      <section class="last">
        <header>
          <span>
            号码操作记录
          </span>
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
              <el-select size="mini" v-model="query.type" class="hundred">
                <el-option value="" label="全部"></el-option>
                <el-option v-for="(item, index) in dict.OperateContent" :label="item.desc" :value="item.code" :key="item.code"></el-option>
                <!--<el-option value="2" label="激活"></el-option>-->
                <!--<el-option value="3" label="停机"></el-option>-->
                <!--<el-option value="4" label="销户"></el-option>-->
              </el-select>
            </div>
            <div class="inline">
              <el-button class="button" type="primary" size="mini" @click="queryNum">查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="loading">
            <el-table :data="tableData" border size="small" :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column prop="cardNo" label="操作号码" sortable></el-table-column>
              <el-table-column prop="operateContentDesc.desc" label="操作内容"></el-table-column>
              <el-table-column prop="operatorName" label="操作用户"></el-table-column>
              <el-table-column prop="insertTime" label="操作时间" sortable></el-table-column>
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
      name: "handle",
      data () {
        return {
          loading: false,  //号码操作记录表格查询中，默认隐藏loading
          //号码操作
          numname: '0',
          disnumber: true,  //判断号码是否符合要求，默认为不符合，按钮禁用
          disfile: true,  //判断txt文档是否符合要求，默认为不符合，按钮禁用
          number: '',  //号码
          //上传txt设置
          uploadTxt: {
            action: 'http://localhost:9130/api-card/card/operateCardBatch',  //上传地址
            type: '',
            limit: 1,  //个数限制
            falseMean: false
          },
          fileList: [],  //已选择上传文件
          downloadUrl: 'http://localhost:9391/api-user/company/downTxt',
          //号码自定义标签
          tabname: 'first',  //转换面板name
          //针对订单
          ordernum: '',  //订单号
          tag: '',  //自定义标签
          tagvalue: '',  //标签值
          //针对iccid
          iccidnum: '',  //iccid号段
          //号码操作记录
          query: {
            range: [this.$date.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')],  //查询时间段，默认为至今一个月
            type: ''
          },
          tableData: [],
          pagination: {
            curpage: 1,
            pagesize: 10,
            totalsize: 100
          },
          dict: {
            OperateContent:[]
          }
        }
      },
      computed: {
        headers () {
          return {
            'token': localStorage.getItem('token')
          }
        },
        operateType () {
          return ''
        }
      },
      created () {
        this.getOperateContent()
        this.queryNum()
      },
      methods: {
        getOperateContent () {
          this.$http.get('/caihiot/api-card/dict/list/9')
            .then((res) => {
              console.log(res)
              this.dict.OperateContent = res.dict
            })
            .catch((err) => {
              console.log(err)
            })
        },
        operateOne (type) {
          if (this.number.length === 11) {
            this.$ajax.get("/caihiot/api-card/card/operateCard/" + this.number + "/" + type)
              .then((res) => {
                console.log(res.data)
                if (res.data.code == '0') {
                  this.$message.success('单号码操作成功')
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            this.$message.error("号码应为11位")
          }
          this.number = ''
        },
        batchOperate (type) {
          this.uploadTxt.type = type
          this.$refs.txtUpload.submit()
        },
        submitUpload: function(content) {  //自定义的上传
          let formData = new FormData()
          formData.append('file', content.file)
          formData.append('type', this.uploadTxt.type)
          let config = {
            'Content-Type': 'multipart/form-data'
          }
          let var_this = this
          var_this.$ajax.post(this.uploadTxt.action, formData, config)
            .then(function(res) {
              console.log(res)
              if (res.data.code == '0') {
                var_this.$message.success('多号码操作成功')
              } else {
                var_this.$message.error(res.data.msg)
              }
              var_this.fileList = []
            })
            .catch(function(error) {
              console.log(error)
            })
        },
        //上传前限制图片大小或格式
        beforeHandle (file) {
          if (file) {
            console.log('file', file)
            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过2MB')
            }
            return isLt2M
          } else {
            return false
          }
        },
        //超出图片个数限制时触发
        handleExceed (file) {
          this.$message.error('只能上传一个文件')
        },
        queryNum () {  //查询号码操作记录
          this.$commom.log('this.query', this.query)
          let sendData = {
            fistDate: this.query.range[0],
            endDate: this.query.range[1],
            operateContent: this.query.type,
            page: this.pagination.curpage,
            limit: this.pagination.pagesize
          }
          this.loading = true
          this.$ajax.get('/operatequery/caihiot/queryoperaterecord', {
            params: sendData
          })
            .then((res) => {
              console.log(res.data)
              this.tableData = res.data.list.list
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
        //分页按钮
        handleCurrentChange (val) {
          console.log('val')
          console.log(val)
          this.pagination.curpage = val
          this.queryNum()
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  .first .main-content {
    margin-top: 8px;
  }
</style>
