<template>
  <div id="app">
    <div class="navbar">
        <h3>Dynamo Req {{$store.global.environment}}</h3>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'dynareq-ui',
    store: {
        global: 'global'
    }
  }
</script>

<style>
  /* CSS */
</style>
