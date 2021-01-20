<template>
  <div id="app">
    <Baccarat msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Baccarat from './components/Baccarat.vue'

export default {
  name: 'App',
  components: {
    Baccarat
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
body {
  margin: 0;
}
</style>
