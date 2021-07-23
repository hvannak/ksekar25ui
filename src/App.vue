<template>
  <div id="nav">
    <router-link to="/"><fa icon="home" class="fa-4x" /></router-link> |
    <router-link to="/about"><fa icon="carrot" class="fa-4x" /></router-link> |
    <router-link to="/notication"><fa icon="bell" class="fa-4x" /></router-link>
  </div>
  <router-view />
  <div id="footer">
    <p>&copy; - កសិករ២៥ - ទំនាក់ទំនង៖ 078 949 799 - vannak2010@gmail.com</p>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #footer{
    outline: $outline-color solid $outline-width;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    color: white;
    text-align: center;
    background-color: $base-color;
  }

  #nav {
    padding: 30px;
    outline: $outline-color solid $outline-width;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: $link-color;
      }
    }
  }
</style>
