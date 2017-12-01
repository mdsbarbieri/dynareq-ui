<template>
    <nav class="navbar is-dark is-fixed-top" v-bind:class="{ isMac: isMac}">
        <div class="navbar-brand" >
            <a class="navbar-item">
                <img src="../assets/image/logo.png"/>
            </a>
        </div>
    </nav>
</template>
<script>
    import os from 'os';
    import _ from "lodash";
    export default {
        name: 'navbar',
        store: ['request'],
        data(){
            return {
                isMac : (_.isEqual(os.platform(), 'darwin')) ? true : false
            }
        }
    }
</script>