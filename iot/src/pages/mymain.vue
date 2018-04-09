<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>账号总览</span>
        </header>
        <main>
          <header>
            <span>号码概况</span>
          </header>
          <div class="main-content">
            <div class="main-tab" v-show="hasdata">
              <el-tabs v-model="tabname" @tab-click="handleClick">
                <el-tab-pane label="总体" name="total" v-loading="loading" element-loading-text="拼命加载中">
                  <div class="flex">
                    <div class="left-pie">
                      <div :id="pieTotal" :option="pieOptionAll"></div>
                    </div>
                    <div class="right-table right-table-total">
                      <el-table :data="tableData" border size="small">
                        <el-table-column prop="name" label="生命周期"></el-table-column>
                        <el-table-column prop="percentage" label="占比" :formatter="perFormat"></el-table-column>
                        <el-table-column prop="y" label="卡数量"></el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="中国移动" name="0" v-loading="loading" element-loading-text="拼命加载中">
                  <div class="flex">
                    <div class="left-pie">
                      <div :id="pieYD" :option="pieOption"></div>
                    </div>
                    <div class="right-table">
                      <el-table :data="tableData" border size="small">
                        <el-table-column prop="name" label="生命周期"></el-table-column>
                        <el-table-column prop="percentage" label="占比"></el-table-column>
                        <el-table-column prop="y" label="卡数量"></el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="中国联通" name="1" v-loading="loading" element-loading-text="拼命加载中">
                  <div class="flex">
                    <div class="left-pie">
                      <div :id="pieLT" :option="pieOption"></div>
                    </div>
                    <div class="right-table">
                      <el-table :data="tableData" border size="small">
                        <el-table-column prop="name" label="生命周期"></el-table-column>
                        <el-table-column prop="percentage" label="占比"></el-table-column>
                        <el-table-column prop="y" label="卡数量"></el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="中国电信" name="2" v-loading="loading" element-loading-text="拼命加载中">
                  <div class="flex">
                    <div class="left-pie">
                      <div :id="pieDX" :option="pieOption"></div>
                    </div>
                    <div class="right-table">
                      <el-table :data="tableData" border size="small">
                        <el-table-column prop="name" label="生命周期"></el-table-column>
                        <el-table-column prop="percentage" label="占比"></el-table-column>
                        <el-table-column prop="y" label="卡数量"></el-table-column>
                      </el-table>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="main-none" v-show="!hasdata">暂无数据</div>
          </div>
        </main>
      </section>
    </div>
</template>

<script>
  import HighChart from 'highcharts'
  export default {
      name: "mymain",
      data () {
        return {
          hasdata: true,  //是否有数据的标识
          loading: false,  //号码申请记录表格查询中，默认隐藏loading
          tabname: 'total',  //tabs切换标识
          tableData: [],  //表格数据，公用
          pieId: '',  //pieChart的id，用于操作样式，公用
          pieTotal: 'total-pie',  //总体pieChart的id
          pieYD: 'yd-pie',  //移动pieChart的id
          pieLT: 'lt-pie',  //联通pieChart的id
          pieDX: 'dx-pie',  //电信pieChart的id
          //pieChart的选项
          pieOptionAll: {
            chart: {
              type: 'pie'
            },
            title: {
              text: ''
            },
            subtitle: {
              text: '内环为运营商占比，外环为测试期类型'
            },
            plotOptions: {
              pie: {
                shadow: false,
                center: ['50%', '50%']
              }
            },
            tooltip: {
              valueSuffix: '%'
            },
            series: []
          },
          pieOption: {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
            },
            title: {
              text: ''
            },
            tooltip: {
              headerFormat: '{series.name}<br>',
              pointFormat: '{point.name}: <b>{point.y}张，占{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.y}张，占{point.percentage:.1f} %'
                },
                showInLegend: true
              }
            },
            series: []
          }
        }
      },
      created () {
      },
      mounted () {
        // HighChart.chart(this.pieTotal, this.pieOption)
        this.loadPie()
      },
      methods: {
        //加载pie数据
        loadPie () {
          console.log(this.tabname)
          //设置pieChart的id和选项
          if (this.tabname === 'total') {
            this.pieId = this.pieTotal
            this.pieOptionAll.title.text = '物联网卡总体占比'
            // this.pieOption.colors = ['rgb(144, 237, 125)', 'rgb(108, 201, 89)', 'rgb(72, 165, 53)','rgb(103, 103, 108)', 'rgb(67, 67, 72)', 'rgb(31, 31, 36)', 'rgb(124, 181, 236)', 'rgb(88, 145, 200)', 'rgb(52, 109, 164)']
          } else if (this.tabname === '0') {
            this.pieId = this.pieYD
            this.pieOption.title.text = '物联网卡移动占比'
            // this.pieOption.colors = ['rgb(144, 237, 125)', 'rgb(108, 201, 89)', 'rgb(72, 165, 53)']
          } else if (this.tabname === '1') {
            this.pieId = this.pieLT
            this.pieOption.title.text = '物联网卡联通占比'
            // this.pieOption.colors = ['rgb(103, 103, 108)', 'rgb(67, 67, 72)', 'rgb(31, 31, 36)']
          } else if (this.tabname === '2') {
            this.pieId = this.pieDX
            this.pieOption.title.text = '物联网卡电信占比'
            // this.pieOption.colors = ['rgb(124, 181, 236)', 'rgb(88, 145, 200)', 'rgb(52, 109, 164)']
          }
          console.log(this.pieId, this.pieOption)
          //开始加载，请求数据
          this.loading = true
          this.$ajax.get('/mainchart/caihiot/cardinfo/overview/testceshi/' + this.tabname)
            .then((res) => {
              console.log('res.data', res.data)
              //取数据
              if (this.tabname === "total") {
                this.tableData = res.data.data
                this.dealData(res.data.data, res.data.categories)
                HighChart.chart(this.pieId, this.pieOptionAll)
              } else {
                this.tableData = res.data.data
                this.pieOption.series = [{
                  type: 'pie',
                  name: '物联网卡',
                  data: res.data.data
                }]
                HighChart.chart(this.pieId, this.pieOption)
              }
              // let piedata = []
              // let pieAll = []
              // for (let i in res.data) {
              //   console.log(res.data[i])
              //   piedata.push(res.data[i])
              // }
              // console.log('piedata', piedata)
              // this.pieOption.series = [{
              //   type: 'pie',
              //   name: '物联网卡',
              //   data: res.data.list
              // }]
              //加载pie
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
              this.loading = false
            })
        },
        handleClick (tab, event) {
          this.loadPie()
        },
        dealData (data, categories) {
          let operateData = []
          let typeData = []
          for (let i = 0; i < data.length; i += 1) {
            // 添加浏览器数据
            operateData.push({
              name: categories[i],
              y: data[i].y,
              color: data[i].color
            });
            // 添加版本数据
            let drillDataLen = data[i].drilldown.data.length;
            for (let j = 0; j < drillDataLen; j += 1) {
              let brightness = 0.2 - (j / drillDataLen) / 5;
              typeData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: HighChart.Color(data[i].color).brighten(brightness).get()
              });
            }
          }
          console.log("operateData", operateData)
          console.log("typeData", typeData)
          this.pieOptionAll = {
            chart: {
              type: 'pie'
            },
            title: {
              text: ''
            },
            subtitle: {
              text: '内环为运营商占比，外环为测试期类型'
            },
            plotOptions: {
              pie: {
                shadow: false,
                center: ['50%', '50%']
              }
            },
            tooltip: {
              valueSuffix: '%'
            },
            series: [{
              name: '运营商',
              data: operateData,
              size: '60%',
              dataLabels: {
                formatter: function () {
                  return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
              }
            },
              {
                name: '测试期类型',
                data: typeData,
                size: '80%',
                innerSize: '60%',
                dataLabels: {
                  formatter: function () {
                    // 大于1则显示
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
                  }
                }
              }]
          }
          // this.pieOption.series = [
          //   {
          //     name: '运营商',
          //     data: operateData,
          //     size: '60%',
          //     dataLabels: {
          //       formatter: function () {
          //         return this.y > 5 ? this.point.name : null;
          //       },
          //       color: 'white',
          //       distance: -30
          //     }
          //   },
          //   {
          //     name: '测试期类型',
          //     data: typeData,
          //     size: '80%',
          //     innerSize: '60%',
          //     dataLabels: {
          //       formatter: function () {
          //         // 大于1则显示
          //         return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%'  : null;
          //       }
          //     }
          //   }
          // ]
        },
        perFormat (row, column, cellValue) {
          return cellValue.toString().slice(0, cellValue.toString().length-1) + "%"
        }
      }
    }
</script>

<style scoped>
  @import "../assets/css/base.css";
  .main-content {
    /*position: relative;*/
    margin: 0 auto;
    text-align: center;
  }
  .main-tab {
    margin: 10px 20px;
    text-align: left;
  }
  .main-none {
    margin: 30px;
  }
  .right-table-total {
    margin: 14% 0 auto 2px;
  }
  #total-pie {
    width: 530px;
  }
  #yd-pie {
    width: 500px;
  }
  #lt-pie {
    width: 500px;
  }
  #dx-pie {
    width: 500px;
  }
</style>
