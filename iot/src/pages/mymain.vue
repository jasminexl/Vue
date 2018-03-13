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
          <div class="main-content clearfloat">
            <!--此处需要页面示例-->
            <!--暂无号码数据-->
            <div class="main-tab" v-show="hasdata">
              <el-tabs v-model="tabname">
                <el-tab-pane label="总体" name="all">
                  <div class="left-pie">总体</div>
                  <div class="right-table">
                    <el-table :data="tableData" border size="small">
                      <el-table-column prop="date" label="生命周期"></el-table-column>
                      <el-table-column prop="name" label="占比"></el-table-column>
                      <el-table-column prop="address" label="卡数量"></el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="中国移动" name="yd">
                  <div class="left-pie">中国移动</div>
                  <div class="right-table">
                    <el-table :data="tableData" border size="small">
                      <el-table-column prop="date" label="生命周期"></el-table-column>
                      <el-table-column prop="name" label="占比"></el-table-column>
                      <el-table-column prop="address" label="卡数量"></el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="中国联通" name="lt">
                  <div class="left-pie">中国联通</div>
                  <div class="right-table">
                    <el-table :data="tableData" border size="small">
                      <el-table-column prop="date" label="生命周期"></el-table-column>
                      <el-table-column prop="name" label="占比"></el-table-column>
                      <el-table-column prop="address" label="卡数量"></el-table-column>
                    </el-table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="中国电信" name="dx">
                  <div class="left-pie">中国电信</div>
                  <div class="right-table">
                    <el-table :data="tableData" border size="small">
                      <el-table-column prop="date" label="生命周期"></el-table-column>
                      <el-table-column prop="name" label="占比"></el-table-column>
                      <el-table-column prop="address" label="卡数量"></el-table-column>
                    </el-table>
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
    export default {
      name: "mymain",
      data () {
        return {
          hasdata: true,
          tabname: 'all',
          tableData: [{
            name: '2016-05-02',
            date: '沉默期',
            address: '1518 弄'
          }, {
            name: '2016-05-04',
            date: '测试期',
            address: '1517 弄'
          }, {
            name: '2016-05-01',
            date: '计算期',
            address: '1519 弄'
          }
          ]
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
</style>
