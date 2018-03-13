<template>
    <div class="wrapper">
      <div class="content">
        <header>
          <span><i class="el-icon-edit"></i>城市信息</span>
        </header>
        <main>
          <section class="option">
            <select v-model="cityType">
              <option value="" selected>请选择</option>
              <option value="guess">当前城市</option>
              <option value="hot">热门城市</option>
              <option value="group">所有城市</option>
            </select>
            <button @click="queryCity">查询</button>
          </section>
          <loading v-show="isQuery"></loading>
          <section v-show="!isQuery" class="result">
            <li v-if="cityType === 'guess'">{{cityList.id}}{{cityList.name}}</li>
            <ul v-if="cityType !== 'guess'" v-for="cityItem in cityList">
              <li>{{cityItem.id}}{{cityItem.name}}</li>
            </ul>
          </section>
        </main>
      </div>
      <div class="foot"></div>
    </div>
</template>

<script>
  import api from '../../api'
  import Loading from '../commom/loading'
  export default {
    name: 'three',
    components: {
      Loading
    },
    data () {
      return {
        isQuery: false,
        cityType: '',
        cityList: {}
      }
    },
    created () {
    },
    methods: {
      queryCity () {
        this.isQuery = true
        console.log(this.cityType)
        this.$ajax.get(api.getCity(this.cityType))
          .then((res) => {
            console.log(res.data)
            this.cityList = res.data
          })
          .catch((err) => {
            console.log(err)
          })
        this.isQuery = false
      }
    }
  }
</script>

<style scoped>
  .content {
    padding: 20px;
  }
  header {
    padding: 10px 0 10px 20px;
    border: 1px solid #ccc;
    font-size: 20px;
    font-weight: bold;
  }
  main {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
  }
  .option {
    padding: 10px 10px 20px 10px;
  }
  .option button {
    background-color: #303340;
    border: none;
    border-radius: 4px;
    color: white;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
  }
  .result {
    padding: 20px 10px 10px;
    border-top: 1px solid #ccc;
  }
</style>
