<template>
    <div class="wrapper">
      <div class="content">
        <div>
          <router-link to="/home/two">返回</router-link>
          <span>{{this.id}}</span>
        </div>
        <div class="content-user">
          <!--<img :src="contentList.author.avatar_url"/>-->
          <!--<span>{{contentList.author.loginname}}</span>-->
        </div>
        <main v-html="contentList.content">
          <!--{{contentList.content}}-->
        </main>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'topic',
    data () {
      return {
        id: this.$route.params.id,
        contentList: {}
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$http.get('topic/' + this.id)
          .then((res) => {
            this.contentList = res.data.data
            console.log(res.data.data)
            console.log(this.contentList)
          })
      }
    }
  }
</script>

<style scoped>
  main {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
  }

</style>
