<template>
    <div class="wrapper">
      <!--<section>-->
        <!--<header>-->
          <!--<span>号码操作</span>-->
        <!--</header>-->
        <!--<div class="main-content">-->
          <!--<div class="form-group-half" style="float: left">-->
            <!--<p class="form-p">请输入号码</p>-->
            <!--<div style="margin-bottom: 10px">-->
              <!--<div class="quarter">-->
                <!--<el-input placeholder="请输入号码" size="mini" v-model="number"></el-input>-->
              <!--</div>-->
              <!--<div class="quarter alert-warning">-->
                <!--<div><i class="el-icon-warning"></i> 请输入11位号码</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div>-->
              <!--<el-button size="mini" :disabled="number.length !== 11 && number.length !== 13" type="primary" @click="start">开机</el-button>-->
              <!--<el-button size="mini" :disabled="number.length !== 11 && number.length !== 13" type="primary">停机</el-button>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="form-group-half" style="margin-left: 20px;width: 45%">-->
            <!--<p class="form-p">请上传txt文档</p>-->
            <!--<div style="margin-bottom: 10px">-->
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
            <!--<div style="margin-bottom: 10px">-->
              <!--<a class="download" :href="downloadUrl"><i class="el-icon-download"></i> 下载示例文档</a>-->
            <!--</div>-->
            <!--<div>-->
              <!--<el-button size="mini" :disabled="disfile" type="primary" @click="start">开机</el-button>-->
              <!--<el-button size="mini" :disabled="disfile" type="primary">停机</el-button>-->
              <!--<el-button size="mini" :disabled="disfile" type="primary">销户</el-button>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</section>-->
      <section class="last">
        <header>
          <span>号码操作管理</span>
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
                <el-input size="mini" placeholder="客户账号" v-model="query.custAccount" @keyup.enter.native="queryOperate" ></el-input>
              </div>
            </div>
            <div class="inline">
              <span>操作类型：</span>
              <el-select size="mini" v-model="query.type">
                <el-option value="" label="全部"></el-option>
                <el-option v-for="(item, index) in dict.OperateContent" :label="item.desc" :value="item.code" :key="item.code"></el-option>
                <!--<el-option value="2" label="激活"></el-option>-->
                <!--<el-option value="3" label="停机"></el-option>-->
                <!--<el-option value="4" label="销户"></el-option>-->
              </el-select>
            </div>
            <div class="inline">
              <el-button class="button" type="primary" size="mini" :disabled="loading" @click="queryOperate">查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="loading" element-loading-text="拼命加载中">
            <el-table :data="operateData" border size="small" style="width: 100%">
              <el-table-column prop="custAccount" label="客户账号" sortable></el-table-column>
              <el-table-column prop="cardNo" label="操作号码" sortable></el-table-column>
              <el-table-column prop="operateContentDesc.desc" label="操作内容"></el-table-column>
              <el-table-column prop="operatorName" label="操作用户"></el-table-column>
              <el-table-column prop="insertTime" label="操作时间" sortable></el-table-column>
              <!--<el-table-column label="操作" width="77px">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button type="primary" size="mini" @click="modify(scope.row)">修改</el-button>-->
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
        disnumber: true,  //判断号码是否符合要求，默认为不符合，按钮禁用
        disfile: true,  //判断txt文档是否符合要求，默认为不符合，按钮禁用
        number: '',  //号码
        fileList: [],  //已选择上传文件
        downloadUrl: 'http://localhost:9391/api-user/company/downTxt',
        query: {
          range: [this.$date.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')],  //查询时间段，默认为至今一个月
          custAccount: '',
          type: ''
        },
        operateData: [],
        pagination: {
          curpage: 1,
          pagesize: 10,
          totalsize: 0
        },
        dict: {
          OperateContent:[]
        }
      }
    },
    created () {
      this.getOperateContent()
      this.queryOperate()
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
      queryOperate () {
        this.$commom.log('this.query', this.query)
        let sendData = {
          fistDate: this.query.range[0],
          endDate: this.query.range[1],
          operateContent: this.query.type,
          custAccount: this.query.custAccount,
          page: this.pagination.curpage,
          limit: this.pagination.pagesize
        }
        this.loading = true
        this.$ajax.get('/caihiot/api-card/card/queryoperaterecord', {
          params: sendData
        })
          .then((res) => {
            console.log(res.data)
            this.operateData = res.data.list.list
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
        this.queryOperate()
      }
    }
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";
</style>
