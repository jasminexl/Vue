<template>
  <div class="home">
    <my-header></my-header>
    <main>
      <nav-menu></nav-menu>
      <div class="pages" id="pages">
        <!--<keep-alive>-->
          <!--<router-view/>-->
        <!--</keep-alive>-->
        <router-view/>
      </div>
    </main>
  </div>
</template>

<script>
  import navMenu from '../common/navmenu'
  import myHeader from '../common/myheader'
  export default {
    name: "home",
    components: {
      navMenu,
      myHeader
    },
    mounted () {
      console.log(document.getElementById('navside').clientHeight + 'px')
      document.getElementById('pages').style.minHeight = document.getElementById('navside').clientHeight - 20 + 'px'
    }
  }
</script>

<style scoped>
  .home {
    background-color: #f4f5f5;
    height: 100%;
  }
  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1700px;
  }
  .pages {
    margin-top: 20px;
    margin-left: 220px;
    margin-bottom: 20px;
    border-radius: 4px;
  }
</style>
