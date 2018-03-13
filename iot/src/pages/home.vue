<template>
    <div class="home">
      <my-header></my-header>
      <main>
        <nav-side></nav-side>
        <div class="pages" id="pages">
          <router-view/>
        </div>
      </main>
    </div>
</template>

<script>
  import myHeader from '../components/myheader'
  import navSide from '../components/navside'
    export default {
      name: "home",
      components: {
        myHeader,
        navSide
      },
      mounted () {
        console.log(document.getElementById('navside').clientHeight + 'px')
        document.getElementById('pages').style.minHeight = document.getElementById('navside').clientHeight - 20 + 'px'
      },
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
    max-width: 1100px;
  }
  .pages {
    margin-top: 20px;
    margin-left: 220px;
    margin-bottom: 20px;
    border-radius: 4px;
  }
</style>
