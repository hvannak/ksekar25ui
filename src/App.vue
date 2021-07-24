<template>
  <div id="nav">
    <router-link to="/"><fa icon="home" class="fa-4x" /></router-link> |
    <router-link to="/about"><fa icon="carrot" class="fa-4x" /></router-link> |
    <router-link to="/notication"><fa icon="bell" class="fa-4x" /></router-link>
  </div>
  <router-view />
  <div id="footer">
    <p>&copy; - កសិករ២៥ - ទំនាក់ទំនង៖ 078 949 799 - vannak2010@gmail.com</p>
    <p>
      <i class="fab fa-facebook-square fa-2x iconline"></i>
      <i class="fab fa-twitter-square fa-2x iconline"></i>
      <i class="fab fa-youtube-square fa-2x iconline"></i>
      <i class="fab fa-instagram-square fa-2x iconline"></i>
      <i class="fab fa-linkedin fa-2x iconline"></i>
      <i class="fab fa-telegram fa-2x iconline"></i>
    </p>
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
    height: 100px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    color: white;
    text-align: center;
    background-color: $base-color;
    margin-top: -12px;
  }

  .iconline {
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
  }

  .iconline:hover {
    color: $hover-color;
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
