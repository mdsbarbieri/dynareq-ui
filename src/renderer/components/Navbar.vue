<template>
    <nav class="navbar is-dark is-fixed-top">
        <div class="navbar-brand">
            <a class="navbar-item">
                <h1>DynareqUI</h1>
            </a>
        </div>
        <div class="navbar-end navbar-item has-dropdown is-hoverable">
            <a class="navbar-link color-environment"  v-bind:class="{ isProduction: $store.global.environment.isProduction}" >
                <div class="center">{{$store.global.environment.name}}</div>
            </a>
            <div class="navbar-dropdown">
                <a class="navbar-item" v-on:click="changeEnvironment('Production', true)">
                    Production
                </a>
                <a class="navbar-item" v-on:click="changeEnvironment('HML', false)">
                    HML
                </a>
                <a class="navbar-item" v-on:click="changeEnvironment('Local', false)">
                    Local
                </a>
            </div>
        </div>
    </nav>
</template>
<script>
    export default {
        name: 'navbar',
        data: function() {
            return {}
        },
        methods: {
            changeEnvironment(environment, isProduction) {
                this.$store.global.environment.isProduction = isProduction;
                this.$store.global.environment.name = environment;
            }
        }
    }
</script>