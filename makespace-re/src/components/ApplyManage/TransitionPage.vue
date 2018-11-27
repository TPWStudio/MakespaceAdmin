<template>

</template>

<script>
    export default {
        name: "TransitionPage",
      created(){
          console.log('123123');
        this.$router.push({path:this.$route.query.p,query:{select:this.$route.query.select}});
      }
    }
</script>

<style scoped>

</style>
