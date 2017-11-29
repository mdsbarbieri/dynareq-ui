<template>
    <div class="tabs">
        <ul>
            <li class="is-active"><router-link to="/">Home</router-link></li>
            <li><router-link to="/registerip">Register Environments</router-link></li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'tab'
    }
</script>