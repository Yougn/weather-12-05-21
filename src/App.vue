<template>
  <div id="app">
    <div id="nav">
      <!--      <router-link to="/">Home</router-link> |-->
      <!--      <router-link to="/about">About</router-link> |-->
      <!--      <router-link to="/weather">Weather</router-link>-->
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

body {
  margin: 0;
  padding: 0;
  overflow-y: hidden;
}

#app {
  font-family: Barlow, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-style: normal;
  font-weight: normal;
  color: var(--black);
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
