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
            <strong>Dynareq-UI</strong> by <a href="https://github.com/edubarbieri/" target="_blank">Eduardo Barbieri</a> and <a href="https://github.com/mdsbarbieri/"  target="_blank">Matheus Barbieri</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php"  target="_blank">MIT</a> - Version {{version}}
        </p>
        </div>
    </div>
    </footer>
  </div>
  
</template>

<script>
    import Navbar from '@/components/Navbar';
    import Tab from '@/components/Tab';
    import packageJson from '../../package.json';
    import {
        get
    } from './scripts/Data'

    export default {
        components: {
            Navbar,
            Tab
        },
        data(){
            return {
                version : packageJson.version
            }
        },
        store: ['global', 'environments', 'actions'],
        name: 'dynareq-ui',
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                var data = get();
                this.environments = data.environments;
                this.actions = data.actions;
            }
        }
    }
</script>

<style>
    /* CSS */
</style>
