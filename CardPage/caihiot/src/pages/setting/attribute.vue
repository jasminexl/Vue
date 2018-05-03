<template>
    <div class="wrapper">
      <section class="last">
        <header>
          <span>自定义属性</span>
        </header>
        <div class="main-content">
          <div class="form-group-self" style="width: 45%;text-align: center;margin-left: 15px;margin-right: 45px">
            <p style="margin: 10px 0">自定义属性</p>
            <el-button type="primary" size="mini" class="hundred"><span style="font-size: 20px">+</span></el-button>
          </div>
          <div class="form-group-self" style="width: 45%;text-align: center">
            <p style="margin: 10px 0">属性值</p>
            <el-button type="primary" size="mini" class="hundred"><span style="font-size: 20px">+</span></el-button>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
    export default {
      name: "attribute"
    }
</script>

<style scoped>
  @import "../../assets/css/base.css";
</style>
