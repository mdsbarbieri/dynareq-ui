<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title">
          Documentation
        </p>
        <p class="subtitle">
          Everything you need to <strong>create a website</strong> with Bulma
        </p>
      </div>
    </section>
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
