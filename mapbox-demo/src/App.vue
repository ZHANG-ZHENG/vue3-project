<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">demo1</router-link> |
      <router-link to="/demo2">demo2</router-link> |
      <router-link to="/demo3">demo3</router-link> | 
      <router-link to="/demo4">demo4</router-link> |  
      <router-link to="/demo5">demo5</router-link> |     
      <router-link to="/demo6">demo6 自定义图片</router-link> |
      <router-link to="/demo7">demo7 数据加载</router-link> |
      <router-link to="/demo8">demo8 动图</router-link> |
      <router-link to="/demo9">demo9 天地图</router-link> |
      <router-link to="/demo10">demo10 本地化</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
