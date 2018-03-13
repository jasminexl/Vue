<template>
  <footer>
    <!--<button v-show="cur !== 1" @click="beforePage">上一页</button>-->
    <!--<div class="pages">-->
      <!--<div v-show="cur === 1">-->
        <!--<button id="cur1">1</button>-->
        <!--<button id="cur2">2</button>-->
        <!--<button id="cur3">3</button>-->
      <!--</div>-->
      <!--<div v-show="cur > 1 && cur < all">-->
        <!--<button :id="'cur' + cur - 1">{{cur - 1}}</button>-->
        <!--<button :id="'cur' + cur">{{cur}}</button>-->
        <!--<button :id="'cur' + cur + 1">{{cur + 1}}</button>-->
      <!--</div>-->
      <!--<div v-show="cur === all">-->
        <!--<button :id="'cur' + all - 2">{{all - 2}}</button>-->
        <!--<button :id="'cur' + all - 1">{{all - 1}}</button>-->
        <!--<button :id="'cur' + all">{{all}}</button>-->
      <!--</div>-->
    <!--</div>-->
    <!--<button v-show="cur !== all" @click="afterPage">下一页</button>-->
    <!--<span>共&nbsp;{{all}}&nbsp;页</span>-->
    <el-pagination
      :current-page.sync="cur"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </footer>
</template>

<script>
  export default {
    name: 'pageFooter',
    data () {
      return {
        cur: this.$emit.curpage,
        total: this.$emit.totalsize,
        all: this.$emit.allpage
      }
    },
    created () {
      this.cur = 1
      this.all = 8
      // this.curBg()
    },
    methods: {
      // getCur (cur) {
      //   if (cur === 1) {
      //   }
      // },
      // beforePage () {
      //   if (this.cur > 1) {
      //     this.cur--
      //   }
      // },
      // afterPage () {
      //   if (this.cur < this.all) {
      //     this.cur++
      //   }
      // },
      // curBg () {
      //   let id = 'cur' + this.cur
      //   document.getElementById('cur1').style.backgroundColor = 'blue'
      //   document.getElementById(id).style.backgroundColor = 'red'
      // }
    }
  }
</script>

<style scoped>
  footer {
    width: 100%;
    margin-top: 10px;
    text-align: right;
    vertical-align: center;
  }
  .pages {
    display: inline-block;
  }
  button {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
    text-align: center;
    text-decoration: none;
  }
</style>
