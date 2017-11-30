<template>
  
  <div id="app" class="small">
    <navbar></navbar>
    <tab></tab>
    <div class="content is-small small">
        <router-view></router-view>
    </div>
    <footer class="footer">
    <div class="container">
        <div class="content has-text-centered">
        <p>
            <strong>Dynareq-UI</strong> by <a href="https://github.com/mdsbarbieri/">Matheus Barbieri</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
        </p>
        </div>
    </div>
    </footer>
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