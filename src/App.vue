<template>
  <div id="app">
    <keep-alive exclude="FootPrint,Search,Home">
      <router-view v-if="isRouterActive"></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  name:"App",
  data(){
    return {
      isRouterActive:true
    }
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterActive = false;
      this.$nextTick(() => {
        this.isRouterActive = true;
      })
    }
  }
}
</script>
  
<style>

</style>
