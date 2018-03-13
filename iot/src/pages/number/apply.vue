<template>
    <div class="wrapper">
      <section>
        <header>
          <span>号码申请</span>
        </header>
        <div class="main-content">
          <div class="form-group-half">
            <div class="from-span"><span>号码数量 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.amount"></el-input>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>卡制式</span></div>
            <!--<span>卡制式</span>-->
            <div class="half">
              <el-radio-group v-model="form.operator" size="mini">
                <el-radio-button label="1">中国移动</el-radio-button>
                <el-radio-button label="2">中国联通</el-radio-button>
                <el-radio-button label="3">中国电信</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>SIM卡类型</span></div>
            <div class="half">
              <!--<el-input size="mini" v-model="form.simtype"></el-input>-->
              <el-select size="mini" v-model="form.simtype" class="hundred">
                <el-option label="标准sim卡" value="1"></el-option>
                <el-option label="mp三切卡" value="2"></el-option>
                <el-option label="mp二切卡" value="3"></el-option>
                <el-option label="ms贴片卡" value="4"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group-half">
            <!--<div class="from-span"><span>网络制式</span></div>-->
            <!--<div class="half">-->
              <!--<el-select size="mini" v-model="form.networktype" class="hundred">-->
                <!--<el-option label="2G/3G/4G" value="0"></el-option>-->
                <!--<el-option label="NB-lot" value="1"></el-option>-->
              <!--</el-select>-->
            <!--</div>-->
            <div class="from-span"><span>测试期 <span class="colorred">*</span></span></div>
            <div class="half">
              <!--<el-input size="mini" v-model="form.testtime"></el-input>-->
              <el-select size="mini" v-model="form.testtime" class="hundred">
                <el-option label="0个月" value="1"></el-option>
                <el-option label="1个月" value="2"></el-option>
                <el-option label="2个月" value="3"></el-option>
                <el-option label="3个月" value="4"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>短信</span></div>
            <div class="half">
              <el-radio-group v-model="form.message">
                <el-radio label="1">开启</el-radio>
                <el-radio label="2">关闭</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>预制套餐挡位 <span class="colorred">*</span></span></div>
            <div class="half">
              <!--<el-input size="mini" v-model="form.prelevel"></el-input>-->
              <el-select size="mini" v-model="form.prelevel" class="hundred">
                <el-option label="10M每月的套餐包" value="1"></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>收件人 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.recipient"></el-input>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>预制套餐时长 <span class="colorred">*</span></span></div>
            <div class="half">
              <!--<el-input size="mini" v-model="form.pretime"></el-input>-->
              <el-select size="mini" v-model="form.pretime" class="hundred">
                <el-option label="不限时长" value="1"></el-option>
                <el-option label="1个月" value="2"></el-option>
                <el-option label="3个月" value="3"></el-option>
                <el-option label="6个月" value="4"></el-option>
                <el-option label="12个月" value="5"></el-option>
              </el-select>
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
            <div class="from-span"><span>收件号码 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.telephone"></el-input>
            </div>
          </div>
          <div class="form-group-half">
            <div class="from-span"><span>收件地址 <span class="colorred">*</span></span></div>
            <div class="half">
              <el-input size="mini" v-model="form.address"></el-input>
            </div>
          </div>
          <div class="confirm-btn">
            <el-button class="button" type="primary" size="mini" @click="confirm">确认申请</el-button>
          </div>
        </div>
      </section>
      <section class="last">
        <header>
          <span>号码申请记录</span>
        </header>
        <div class="main-content">
          <div class="option">
            <div class="inline">
              <el-date-picker
                v-model="record.range"
                size="mini"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"></el-date-picker>
            </div>
            <div class="inline">
              <el-input size="mini" placeholder="请输入号码申请单号" v-model="record.number"></el-input>
            </div>
            <div class="inline">
              <el-button class="button" type="primary" size="mini" @click="query">查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="loading">
            <el-table :data="tableData" border size="small">
              <el-table-column prop="date" label="单号"></el-table-column>
              <el-table-column prop="name" label="申请时间"></el-table-column>
              <el-table-column prop="address" label="申请个数"></el-table-column>
              <el-table-column prop="address" label="导入个数"></el-table-column>
              <el-table-column prop="address" label="当前状态"></el-table-column>
              <el-table-column prop="address" label="厂商"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="detail(scope.row)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="foot-page">
              <el-pagination
                layout="total, prev, pager, next, jumper"
                :total="1000">
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
          //号码申请
          form: {
            amount: '',  //号码数量
            operator: '1',  //卡制式
            simtype: '1',  //SIM卡类型
            // networktype: '1',  //网络制式
            testtime: '1',  //测试期
            prelevel: '1',  //预制套餐挡位
            message: '1',  //短信
            pretime: '1',  //预制套餐时长
            recipient: '',  //收件人
            // slienttime: '',  //沉默期
            telephone: '',  //收件号码
            address: ''  //收件地址
          },
          formRules: {
            notEmpty: [{required: true, message: '号码申请信息不可为空', trigger: 'blur'}]
          },
          //号码申请记录
          record: {
            range: [this.$date.formatDate(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'yyyy-MM-dd'), this.$date.formatDate(new Date(), 'yyyy-MM-dd')],  //查询时间段，默认为至今一个月
            number: ''  //查询单号
          },
          //查询到的表格数据
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      },
      methods: {
        checkForm () {
          let amountObj = {
            param: this.form.amount,
            paramName: '号码数量'
          }
          let testtimeObj = {
            param: this.form.testtime,
            paramName: '测试期'
          }
          let prelevelObj = {
            param: this.form.prelevel,
            paramName: '预制套餐挡位'
          }
          let pretimeObj = {
            param: this.form.pretime,
            paramName: '预制套餐时长'
          }
          let recipientObj = {
            param: this.form.recipient,
            paramName: '收件人'
          }
          let telephoneObj = {
            param: this.form.telephone,
            paramName: '收件号码'
          }
          let addressObj = {
            param: this.form.address,
            paramName: '收件地址'
          }
          // if (this.$commom.checkParam(amountObj)) {
          //   return true
          // } else {
          //   return false
          // }
          return this.$commom.checkParam(amountObj) && this.$commom.checkParam(testtimeObj) && this.$commom.checkParam(prelevelObj) && this.$commom.checkParam(pretimeObj) && this.$commom.checkParam(recipientObj) && this.$commom.checkParam(telephoneObj) && this.$commom.checkParam(addressObj)
        },
        //确认申请按钮
        confirm () {
          if (this.checkForm()) {
            this.$commom.log("this.form", this.form)
          }
        },
        //号码申请查询按钮
        query () {
          console.log(this.record)
        },
        detail (row) {
          console.log(row)
          console.log(row.date)
          this.$router.push('/home/applydetail')
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
