<template>
  <div>
    <div :id="id" :option="option"></div>
  </div>
</template>

<script>
  import HighChart from 'highcharts'
  export default {
    name: "chart",
    props: {
      id: {
        type: String
      },
      option: {
        type: Object
      }
    },
    mounted () {
      HighChart.chart(this.id, this.option)
    }
  }
</script>

<style scoped>

</style>
