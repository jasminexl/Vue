<template>
    <div class="wrapper">
      <div class="content">
        <header>
          <span>渠道商产品</span>
        </header>
        <main>
          <section class="option">
            <el-date-picker type="date" placeholder="请输入日期"></el-date-picker>
            <input type="date"/>
          </section>
          <section class="result">
            <!--<table class="datatable">-->
            <!--<thead>-->
            <!--<tr>-->
            <!--<th>产品编号</th>-->
            <!--<th>产品名称</th>-->
            <!--<th>版本</th>-->
            <!--<th>有效期</th>-->
            <!--<th>购买数</th>-->
            <!--<th>购买时间</th>-->
            <!--<th>价格</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="(product, index) in productList" :class="{odd: index % 2 === 1}">-->
            <!--<td>{{product.orderId}}</td>-->
            <!--<td>{{product.product}}</td>-->
            <!--<td>{{product.version}}</td>-->
            <!--<td>{{product.period}}</td>-->
            <!--<td>{{product.buyNum}}</td>-->
            <!--<td>{{product.dateformat}}</td>-->
            <!--<td>{{product.amount}}</td>-->
            <!--</tr>-->
            <!--</tbody>-->
            <!--</table>-->
            <el-table :data="productList" stripe border style="color: black">
              <el-table-column prop="orderId" label="产品编号"></el-table-column>
              <el-table-column prop="product" label="产品名称"></el-table-column>
              <el-table-column prop="version" label="版本"></el-table-column>
              <el-table-column prop="period" label="有效期"></el-table-column>
              <el-table-column prop="buyNum" label="购买数"></el-table-column>
              <el-table-column prop="date" label="购买时间"></el-table-column>
              <el-table-column prop="amount" label="价格"></el-table-column>
            </el-table>
          </section>
        </main>
        <page-footer class="footer"></page-footer>
      </div>
    </div>
</template>

<script>
  import pagefooter from '../commom/pageFooter'
  export default {
    components: {
      'page-footer': pagefooter
    },
    name: 'one',
    data () {
      return {
        productList: []
      }
    },
    created () {
      this.loadData()
    },
    methods: {
      loadData () {
        this.$http.get('http://localhost:8075/static/product.json')
          .then((response) => {
            this.productList = response.data.list
            console.log(response.data.list)
          }, (err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/base.css';
  /*.content {*/
    /*padding: 20px;*/
  /*}*/
  /*header {*/
    /*padding: 10px 0 10px 20px;*/
    /*border: 1px solid #ccc;*/
    /*font-size: 20px;*/
    /*font-weight: bold;*/
  /*}*/
  /*main {*/
    /*margin-top: 20px;*/
    /*padding: 10px;*/
    /*border: 1px solid #ccc;*/
  /*}*/
  /*!*table*!*/
  /*.datatable {*/
    /*width: 100%;*/
    /*padding: 8px;*/
    /*color: #333333;*/
    /*border-collapse: collapse;*/
    /*background-color: #fff;*/
    /*text-align: center;*/
  /*}*/
  /*.datatable thead th {*/
    /*padding: 8px;*/
    /*font-weight: bold;*/
    /*border: 1px solid #c6c6c6;*/
    /*background-color: #fffbef;*/
  /*}*/
  /*.datatable td {*/
    /*padding: 8px;*/
    /*border: 1px solid #c6c6c6;*/
  /*}*/
  /*.odd {*/
    /*background-color: #fffbef;*/
  /*}*/

</style>
