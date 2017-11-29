<template>
  
  <div id="app">
    <navbar></navbar>
    <tab></tab>
    <div class="content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
    import Navbar from '@/components/Navbar';
    import Tab from '@/components/Tab';
    export default {
        components: {
            Navbar,
            Tab
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