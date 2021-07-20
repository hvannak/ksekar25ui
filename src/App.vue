<template>
  <div id="nav">
    <router-link to="/"><fa icon="home" class="fa-4x" /></router-link> |
    <router-link to="/about"><fa icon="carrot" class="fa-4x" /></router-link> |
    <router-link to="/notication"><fa icon="bell" class="fa-4x" /></router-link>
  </div>
  <font-awesome-icon icon="user-secret" />
  <router-view />
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
