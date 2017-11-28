<template>
  
  <div id="app">
    <navbar></navbar>

    <router-view></router-view>
  </div>
</template>

<script>
  import Navbar from  '@/components/Navbar';
  export default {
    components:{
      Navbar
    },
    name: 'dynareq-ui',
    store: {
        global: 'global'
    }
  }
</script>

<style>
  /* CSS */
</style>
