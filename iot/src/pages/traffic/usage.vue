<template>
    <div class="wrapper">
      <section v-loading="cardloading">
        <div class="card" style="border-bottom: 1px solid #e9e9e9;">
          <div class="cardhalf" style="border-right: 1px solid #e9e9e9;">
            <div class="cardhalfdiv">
              <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日消耗流量</span>
              <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastuse' :duration='2000'></count-to> Byte</p>
            </div>
          </div>
          <div class="cardhalf">
            <div class="cardhalfdiv">
              <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;本月已用总流量</span>
              <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.totaluse' :duration='2000'></count-to> Byte</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="cardhalf" style="border-right: 1px solid #e9e9e9;">
            <div class="cardhalfdiv">
              <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;昨日卡均流量</span>
              <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.lastaver' :duration='2000'></count-to> Byte</p>
            </div>
          </div>
          <div class="cardhalf">
            <div class="cardhalfdiv">
              <span style="font-size: 15px"><i class="el-icon-caret-right" style="color: red"></i>&nbsp;&nbsp;近7日卡均流量</span>
              <p style="font-size: 26px;margin: 15px 23px"><count-to :startVal='startnum' :endVal='card.sevenaver' :duration='2000'></count-to> Byte</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <header>
          <span>流量最值情况</span>
        </header>
        <div class="main-content">
          <el-tabs v-model="tabname">
            <el-tab-pane label="昨日流量最多" name="max" style="margin-bottom: 20px">
              <el-table :data="flowmax" border size="small">
                <el-table-column prop="date" label="卡号"></el-table-column>
                <el-table-column prop="name" label="使用流量"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="detail">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="昨日流量最少" name="min" style="margin-bottom: 20px">
              <el-table :data="flowmin" border size="small">
                <el-table-column prop="date" label="卡号"></el-table-column>
                <el-table-column prop="name" label="使用流量"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="detail">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </section>
      <section class="last">
        <header>
          <span>流量使用情况</span>
        </header>
        <div class="main-content">
          <div class="option">
            <div style="margin-bottom: 15px">
              <el-date-picker
                v-model="query.beginday"
                type="date"
                size="mini"
                placeholder="选择开始日期">
              </el-date-picker>
              <span style="margin: 0 10px">至</span>
              <el-date-picker
                v-model="query.endday"
                type="date"
                size="mini"
                placeholder="选择结束日期">
              </el-date-picker>
              <el-button class="button" type="primary" size="mini" style="margin-left: 20px">按日查询</el-button>
            </div>
            <div>
              <el-date-picker
                v-model="query.beginmonth"
                type="month"
                size="mini"
                placeholder="选择开始月份">
              </el-date-picker>
              <span style="margin: 0 10px">至</span>
              <el-date-picker
                v-model="query.endmonth"
                type="month"
                size="mini"
                placeholder="选择结束月份">
              </el-date-picker>
              <el-button class="button" type="primary" size="mini" style="margin-left: 20px">按月查询</el-button>
            </div>
          </div>
          <div class="result" v-loading="chartloading">
            <div class="table-span">
              <span>流量使用情况-按日统计</span>
              <span style="display: block">图表</span>
            </div>
            <div></div>
          </div>
          <div class="result" v-loading="tableloading">
            <div class="table-span"><span>详细数据-按日统计</span></div>
            <el-table
              :data="detaildata"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期">
              </el-table-column>
              <el-table-column label="消耗值（日）">
                <el-table-column
                  prop="name"
                  label="流量值">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="同比">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="环比">
                </el-table-column>
              </el-table-column>
              <el-table-column label="每日卡均流量">
                <el-table-column
                  prop="name"
                  label="流量值">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="同比">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="环比">
                </el-table-column>
              </el-table-column>
              <el-table-column label="每7日卡均流量">
                <el-table-column
                  prop="name"
                  label="流量值">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="同比">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="环比">
                </el-table-column>
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
  import countTo from 'vue-count-to'
    export default {
      name: "usage",
      components: {
        countTo
      },
      data () {
        return {
          cardloading: false,  //卡片查询中，默认隐藏loading
          chartloading: false,  //图表查询中，默认隐藏loading
          tableloading: false,  //表格查询中，默认隐藏loading
          startnum: 0,  //计数开始数
          card: {
            lastuse: 2000,  //昨日消耗流量
            totaluse: 2343,  //本月已用总流量
            lastaver: 2312,  //昨日卡均流量
            sevenaver: 2131  //近7日卡均流量
          },
          tabname: 'max',  //转换面板name
          flowmax: [  //流量最多表格
            {
              date: '2016-05-02',
              name: '50MB'
            }
          ],
          flowmin: [  //流量最少表格
            {
              date: '2018-05-02',
              name: '4.5KB'
            }
          ],
          query: {
            beginday: '',  //开始日
            endday: '',  //结束日
            beginmonth: '',  //开始月
            endmonth: ''  //结束月
          }
          // detaildata: []
        }
      },
      methods: {
        detail () {
          this.$router.push('/home/detail')
        }
      }
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
