<template>
    <div class="wrapper">
      <section>
        <header>
          <span>号码申请</span>
        </header>
        <div class="main-content"
             v-loading="disabled.submit"
             element-loading-text="正在提交中，请稍候"
             element-loading-spinner="el-icon-loading">
             <!--element-loading-background="rgba(0, 0, 0, 0.2)">-->
          <div class="form-group-half">
            <div class="from-span"><span>号码数量 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.cardNum"></el-input>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>运营商 <span class="colorred">*</span></span></div>
            <!--<span>卡制式</span>-->
            <div class="half">
              <el-radio-group v-model="form.cardType" size="mini" class="hundred">
                <el-radio-button v-for="(item, index) in dict.CardType" :label="item.code" :key="item.code">{{item.desc}}</el-radio-button>
                <!--<el-radio-button label="1">中国联通</el-radio-button>-->
                <!--<el-radio-button label="2">中国移动</el-radio-button>-->
                <!--<el-radio-button label="3">中国电信</el-radio-button>-->
              </el-radio-group>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>短信 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-radio-group v-model="form.isSms">
                <el-radio label="1">开启</el-radio>
                <el-radio label="0">关闭</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>SIM卡类型 <span class="colorred">*</span></span></div>
            <div class="half">
              <!--<el-input size="mini" v-model="form.simtype"></el-input>-->
              <el-select size="mini" v-model="form.simType" class="hundred">
                <el-option v-for="(item, index) in dict.SimType" :label="item.desc" :value="item.code" :key="item.code"></el-option>
                <!--<el-option label="标准sim卡" value="1"></el-option>-->
                <!--<el-option label="mp三切卡" value="2"></el-option>-->
                <!--<el-option label="mp二切卡" value="3"></el-option>-->
                <!--<el-option label="ms贴片卡" value="4"></el-option>-->
              </el-select>
            </div>
          </div>
          <!--<div class="form-group-half">-->
            <!--<div class="from-span"><span>测试期时长 <span class="colorred">*</span></span></div>-->
            <!--<div class="half">-->
              <!--&lt;!&ndash;<el-input size="mini" v-model="form.testtime"></el-input>&ndash;&gt;-->
              <!--<el-select size="mini" v-model="form.testPeriodType" class="hundred">-->
                <!--<el-option label="7天" value="1"></el-option>-->
                <!--<el-option label="14天" value="2"></el-option>-->
                <!--<el-option label="21天" value="3"></el-option>-->
                <!--<el-option label="30天" value="4"></el-option>-->
                <!--<el-option label="无测试期" value="5"></el-option>-->
              <!--</el-select>-->
            <!--</div>-->
          <!--</div>-->
          <div class="form-group-half">
            <div class="from-span"><span>网络制式 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-select size="mini" v-model="form.netType" class="hundred">
                <el-option v-for="(item, index) in dict.NetType" :label="item.desc" :value="item.code" :key="item.code"></el-option>
                <!--<el-option label="2G/3G/4G" value="1"></el-option>-->
                <!--<el-option label="NB-lot" value="2"></el-option>-->
              </el-select>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>预制套餐挡位 <span class="colorred">*</span></span></div>
            <div class="half">
              <!--<el-input size="mini" v-model="form.prelevel"></el-input>-->
              <el-select size="mini" v-model="form.comboType" class="hundred">
                <el-option v-for="(item, index) in dict.ComboType" :label="item.desc" :value="item.code" :key="item.code"></el-option>
                <!--<el-option label="100M/月的套餐包" value="1"></el-option>-->
                <!--<el-option label="500M/月的套餐包" value="2"></el-option>-->
                <!--<el-option label="1G/月的套餐包" value="3"></el-option>-->
              </el-select>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>收件人 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.receName"></el-input>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>预制套餐时长 <span class="colorred">*</span></span></div>
            <div class="half">
              <!--<el-input size="mini" v-model="form.pretime"></el-input>-->
              <el-select size="mini" v-model="form.comboTime" class="hundred">
                <el-option v-for="(item, index) in dict.ComboTime" :label="item.desc" :value="item.code" :key="item.code"></el-option>
                <!--<el-option label="不限时长" value="1"></el-option>-->
                <!--<el-option label="3个月" value="2"></el-option>-->
                <!--<el-option label="6个月" value="3"></el-option>-->
                <!--<el-option label="12个月" value="4"></el-option>-->
              </el-select>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>收件号码 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.receiveNo"></el-input>
            </div>
          </div>
          <!--<div class="form-group-half">-->
            <!--<div class="from-span"><span>收件人 <span class="colorred">*</span></span></div>-->
            <!--<div class="half">-->
              <!--<el-input size="mini" v-model="form.recipient"></el-input>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="form-group-half">-->
            <!--<div class="from-span"><span>沉默期 <span class="colorred">*</span></span></div>-->
            <!--<div class="half">-->
              <!--<el-input size="mini" v-model="form.slienttime"></el-input>-->
            <!--</div>-->
          <!--</div>-->
          <div class="form-group-half">
            <div class="from-span"><span>收件地址 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.receiveAddress" @keyup.enter.native="confirm"></el-input>
            </div>
          </div>
          <div class="confirm-btn">
            <el-button class="button" type="primary" size="mini" @click="confirm" :disabled="disabled.submit">
              <span v-if="!disabled.submit">确认申请</span>
              <i v-else class="el-icon-loading"></i>
            </el-button>
          </div>
        </div>
      </section>
      <section class="last">
        <header>
          <span>号码申请记录</span>
        </header>
        <div class="main-content">
          <div class="form-group-half" style="width: 470px" @mouseenter="record.dateStatus = false" @mouseleave="record.dateStatus = true">
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
              <el-button class="button" type="primary" size="mini" @click="queryDate">查询</el-button>
              <!--:disabled="record.dateStatus"-->
            </div>
          </div>
          <!--<div class="form-group-half" style="width: 300px" @mouseenter="record.numStatus = false" @mouseleave="record.numStatus = true">-->
            <!--<div class="inline">-->
              <!--<el-input size="mini" placeholder="请输入号码申请单号" v-model="record.flowId"></el-input>-->
            <!--</div>-->
            <!--<div class="inline">-->
              <!--<el-button class="button" type="primary" size="mini" :disabled="record.numStatus" @click="queryNum">查询</el-button>-->
            <!--</div>-->
          <!--</div>-->
          <div class="result" v-loading="loading" element-loading-text="拼命加载中">
            <el-table :data="tableData" border size="small">
              <el-table-column prop="id" label="单号"></el-table-column>
              <el-table-column prop="insertTime" label="申请时间"></el-table-column>
              <el-table-column prop="cardNum" label="申请个数"></el-table-column>
              <!--<el-table-column prop="address" label="导入个数"></el-table-column>-->
              <el-table-column prop="flowStatusDesc.desc" label="当前状态"></el-table-column>
              <el-table-column prop="applyCompany" label="厂商" :formatter="nullPlaceHolder"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="detail(scope.row)">详情</el-button>
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
    </div>
</template>

<script>
    // import { formatDate } from "../../utils/date/index";
    export default {
      name: "apply",
      data () {
        return {
          loading: false,  //号码申请记录表格查询中，默认隐藏loading
          //按钮禁用
          disabled: {
            submit: false,
            query: false
          },
          //号码申请
          form: {
            cardNum: '',  //号码数量
            cardType: '19',  //卡制式
            simType: '22',  //SIM卡类型
            netType: '26',  //网络制式
            // testPeriodType: '1',  //测试期
            comboType: '28',  //预制套餐挡位
            isSms: '1',  //短信
            comboTime: '32',  //预制套餐时长
            receName: '',  //收件人
            // slienttime: '',  //沉默期
            receiveNo: '',  //收件号码
            receiveAddress: ''  //收件地址
          },
          //用于初始化号码申请表单
          newForm: {
            cardNum: '',  //号码数量
            cardType: '19',  //卡制式
            simType: '22',  //SIM卡类型
            netType: '26',  //网络制式
            // testPeriodType: '1',  //测试期
            comboType: '28',  //预制套餐挡位
            isSms: '1',  //短信
            comboTime: '32',  //预制套餐时长
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
          //号码申请记录
          record: {
            dateStatus: true,
            numStatus: true,
            range: [this.$date.formatDate(new Date(new Date().setDate(1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')],  //查询时间段，默认为至今一个月
            flowId: ''  //查询单号
          },
          //查询到的表格数据
          tableData: [],
          pagination: {
            curpage: 1,
            pagesize: 10,
            totalsize: 100
          },
          dict: {
            CardType: [],
            SimType: [],
            NetType: [],
            ComboType: [],
            ComboTime: []
          }
        }
      },
      created () {
        this.getSimType()
        this.getCardType()
        this.getNetType()
        this.getComboType()
        this.getComboTime()
        this.queryDate()
      },
      methods: {
        getCardType () {
          this.$http.get('/caihiot/api-card/dict/list/3')
            .then((res) => {
              console.log(res)
              this.dict.CardType = res.dict
            })
            .catch((err) => {
              console.log(err)
            })
        },
        getSimType () {
          this.$http.get('/caihiot/api-card/dict/list/4')
            .then((res) => {
              console.log(res)
              this.dict.SimType = res.dict
            })
            .catch((err) => {
              console.log(err)
            })
        },
        getNetType () {
          this.$http.get('/caihiot/api-card/dict/list/5')
            .then((res) => {
              console.log(res)
              this.dict.NetType = res.dict
            })
            .catch((err) => {
              console.log(err)
            })
        },
        getComboType () {
          this.$http.get('/caihiot/api-card/dict/list/6')
            .then((res) => {
              console.log(res)
              this.dict.ComboType = res.dict
            })
            .catch((err) => {
              console.log(err)
            })
        },
        getComboTime () {
          this.$http.get('/caihiot/api-card/dict/list/7')
            .then((res) => {
              console.log(res)
              this.dict.ComboTime = res.dict
            })
            .catch((err) => {
              console.log(err)
            })
        },
        nullPlaceHolder (row, column, cellValue, index) {
          if (!cellValue) {
            return "暂无"
          } else {
            return cellValue
          }
        },
        checkForm () {
          let amountObj = {
            param: this.form.cardNum,
            paramName: '号码数量',
            type: 'regexp',
            content: [/^\d+$/],
            msg: '号码数量应为数字'
          }
          // let testtimeObj = {
          //   param: this.form.testtime,
          //   paramName: '测试期'
          // }
          // let prelevelObj = {
          //   param: this.form.prelevel,
          //   paramName: '预制套餐挡位'
          // }
          // let pretimeObj = {
          //   param: this.form.pretime,
          //   paramName: '预制套餐时长'
          // }
          let recipientObj = {
            param: this.form.receName,
            paramName: '收件人'
          }
          let telephoneObj = {
            param: this.form.receiveNo,
            paramName: '收件号码'
          }
          let addressObj = {
            param: this.form.receiveAddress,
            paramName: '收件地址'
          }
          return this.$commom.checkParam(amountObj) && this.$commom.checkParam(recipientObj) && this.$commom.checkParam(telephoneObj) && this.$commom.checkParam(addressObj)
        },
        //确认申请按钮
        confirm () {
          if (this.checkForm()) {
            this.disabled.submit = true
            this.$commom.log("this.form", this.form)
            this.$ajax({
              method: 'post',
              url: '/caihiot/api-card/card/apply',
              data: JSON.stringify(this.form)
            })
              .then((res) => {
                console.log(res.data)
                if (res.data.code == '0') {
                  this.$message.success(res.data.msg)
                  this.queryDate()
                } else {
                  this.$message(res.data.msg)
                }
              })
              .catch((err) => {
                console.log(err)
              })
            this.form = this.newForm
            this.disabled.submit = false
          }
        },
        //号码申请查询时间段按钮
        queryDate () {
          console.log(this.record)
          this.loading = true
          this.$ajax.get('/caihiot/api-card/card/applyauerybydate', {
            params: {
              fistDate: this.record.range[0],
              endDate: this.record.range[1],
              page: this.pagination.curpage,
              limit: this.pagination.pagesize
            }
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
        //号码申请查询单号按钮
        queryNum () {
          console.log(this.record.flowId)
          if (this.record.flowId) {
            this.$ajax.get('/applyquery/caihiot/querybydate', {
              params: {
                flowId: this.record.flowId,
                custId: '04e40978b0ab490bb1109141dwq25dc1'
              }
            })
              .then((res) => {
                console.log(res.data)
                this.tableData = res.data
                this.loading = false
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            this.$message.error('请输入号码申请单号')
          }
        },
        //点击详情按钮
        detail (row) {
          console.log(row)
          console.log(row.date)
          this.$router.push({name: 'applydetail', params: {id: row.id}})
        },
        //分页按钮
        handleCurrentChange (val) {
          console.log('val')
          console.log(val)
          this.pagination.curpage = val
          this.queryDate()
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  .last .form-group-half {
    width: 49.5%;
    display: inline-block;
    margin-bottom: 0;
  }
</style>
