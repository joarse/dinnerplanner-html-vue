<template>

  <div class="welcome">

    <div class="row">
      <div class="col-12">
        <p>
          {{ msg }}
        </p>
        <br /><br />
        <router-link to="/search">
          <center><button class="btn btn-lg btn-primary">Start planning</button></center>
        </router-link>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Welcome to the dinner planner Vue Startup code! '
      }
    }
  }
</script>

<!-- Example of styling Vue components -->
<!-- With the scoped attribute, CSS will apply to elements of the current component only -->
<style scoped>
  .welcome{
    text-align: center;
  }
</style>
