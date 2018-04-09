<template>
    <div class="wrapper">
      <section>
        <header>
          <span>号码操作</span>
        </header>
        <div class="main-content">
          <div class="form-group-half" style="float: left">
            <p class="form-p">请输入号码（限10个）</p>
            <div style="margin-bottom: 10px">
              <div class="quarter">
                <el-input placeholder="请输入号码" size="mini" v-model="number"></el-input>
              </div>
              <div class="quarter alert-warning">
                <div><i class="el-icon-warning"></i> 请输入11位或13位号码</div>
              </div>
            </div>
            <div>
              <el-button size="mini" :disabled="number.length !== 11 && number.length !== 13" type="primary">开机</el-button>
              <el-button size="mini" :disabled="number.length !== 11 && number.length !== 13" type="primary">停机</el-button>
            </div>
          </div>
          <div class="form-group-half" style="margin-left: 20px;width: 45%">
            <p class="form-p">请上传txt文档</p>
            <div style="margin-bottom: 10px">
              <el-upload
                class="upload-demo"
                action=""
                multiple
                :limit="3"
                :file-list="fileList">
                <el-button size="mini" type="primary"><i class="el-icon-upload"></i>&nbsp;&nbsp;点击上传</el-button>
                <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
              </el-upload>
            </div>
            <div style="margin-bottom: 10px">
              <a class="download" :href="downloadUrl"><i class="el-icon-download"></i> 下载示例文档</a>
            </div>
            <div>
              <el-button size="mini" :disabled="disfile" type="primary" @click="start">开机</el-button>
              <el-button size="mini" :disabled="disfile" type="primary">停机</el-button>
              <el-button size="mini" :disabled="disfile" type="primary">销户</el-button>
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
              <el-select size="mini" v-model="query.type" class="hundred" placeholder="请选择号码状态">
                <el-option value="0" label="全部"></el-option>
                <el-option value="1" label="停/开机"></el-option>
                <el-option value="2" label="开/关流量"></el-option>
                <el-option value="3" label="来电显示"></el-option>
                <el-option value="4" label="销户"></el-option>
                <el-option value="9" label="开/关短信"></el-option>
              </el-select>
            </div>
            <div class="inline">
              <el-button class="button" type="primary" size="mini" @click="queryNum">查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="loading">
            <el-table :data="tableData" border size="small" :default-sort = "{prop: 'date', order: 'descending'}">
              <el-table-column prop="type" label="具体操作"></el-table-column>
              <el-table-column prop="updateDate" label="操作时间" sortable></el-table-column>
              <!--<el-table-column prop="address" label="操作成功时间"></el-table-column>-->
              <!--<el-table-column prop="address" label="号码数"></el-table-column>-->
              <!--<el-table-column prop="address" label="号码详情"></el-table-column>-->
              <el-table-column prop="status" label="结果"></el-table-column>
              <el-table-column prop="operatorName" label="操作人"></el-table-column>
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
          fileList: [  //已选择上传文件
            {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
          ],
          downloadUrl: '',
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
            type: '0'
          },
          tableData: [],
          pagination: {
            curpage: 1,
            pagesize: 10,
            totalsize: 100
          }
        }
      },
      created () {
        this.queryNum()
      },
      methods: {
        start () {  //开机
          this.$message.info('开机')
          // alert('ww12')
        },
        stop () {  //停机

        },
        destroy () {  //销户

        },
        queryNum () {  //查询号码操作记录
          this.$commom.log('this.query', this.query)
          let sendData = {
            fistDate: this.query.range[0],
            endDate: this.query.range[1],
            type: this.query.type,
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
</style>
