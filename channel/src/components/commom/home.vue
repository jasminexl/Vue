<template>
  <div class="wrapper" id="wrapper">
    <v-header></v-header>
    <!--<v-sidebar></v-sidebar>-->
    <v-asidebar></v-asidebar>
    <div class="container" id="container">
      <router-view/>
    </div>
  </div>

</template>

<script>
  import vHeader from './topHeader'
  import vSidebar from './sidebar'
  import vAsideBar from './aside'
  export default {
    name: 'home',
    components: {
      'v-header': vHeader,
      'v-sidebar': vSidebar,
      'v-asidebar': vAsideBar
    },
    created () {
    },
    mounted () {
      console.log(document.getElementById('side').clientHeight + 'px')
      document.getElementById('container').style.height = document.getElementById('side').clientHeight + 'px'
    },
    methods: {
    }
  }
</script>

<style scoped>
  .container {
    overflow: auto;
    margin-left: 200px;
    background-color: #eef3f8;
  }

</style>
