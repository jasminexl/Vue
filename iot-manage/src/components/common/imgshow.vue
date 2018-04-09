<template>
  <div>
    <transition name="fade">
      <div class="img-view" @click="magnify">
        <div class="img-layer"></div>
        <div class="img">
          <img :src="url" width="500"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "imgshow",
    props: ['url'],
    methods: {
      magnify () {
        this.$emit('clickit')
      }
    }
  }
</script>

<style scoped>
  @import "../../assets/css/base.css";
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
