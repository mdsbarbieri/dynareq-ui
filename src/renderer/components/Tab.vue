<template>
    <div class="tabs">
        <div class="tab-overflow" v-show="request.inProgress"></div>
        <ul>
            <li v-bind:class="{ 'is-active': $route.name == 'home'}"><router-link to="/">Home</router-link></li>
            <li v-bind:class="{ 'is-active': $route.name == 'registerEnvironment'}"><router-link to="/registerEnvironment">Register Environments</router-link></li>
            <li v-bind:class="{ 'is-active': $route.name == 'registerAction'}"><router-link to="/registerAction">Register Actions</router-link></li>
            <li v-bind:class="{ 'is-active': $route.name == 'config'}"><router-link to="/config">Config</router-link></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'tab',
        store:['request']
    }
</script>