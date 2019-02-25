<template>
  <div id="app">
    <h1 id="heading">Dinner Planner</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app{
    text-align: center;
    height: 100%;
    width: 100%;
  }
  #heading{
    background-color: gray;
    height: 80px;
    margin-top: 10px;
    padding-top: 20px;
  }
</style>
