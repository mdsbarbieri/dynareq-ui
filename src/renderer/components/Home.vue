<template>
  <div>
    <router-link to="/registerip">Go to</router-link>
  </div>
</template>

<script>
  export default {
    computed: {
      username () {
        return "teste"
      }
    },
    data: function () {
      return {
          name : "juquinha",
          count : 1
      }
    },
    methods: {
    },
    mounted(){
      const vm = this;
      setInterval(function(){
        vm.count++;
      }, 1000)
    }
  }

  
  
</script>
