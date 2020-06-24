<template>
  <div id="app">
<!--     <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <HelloWorld/> -->
    <Login/>
  </div>
</template>

<script>

import Login from './components/login/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }
}
</script>

<style>
html,body{
  height: 100%;
}
body{
  background-size: cover;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  width: 100%;
}

</style>
