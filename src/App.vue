<template>
  <div id="nav">
    <div class="brand">
      <router-link to="/"><fa icon="tractor" class="fa-4x" />កសិករ២៥</router-link>
    </div>
    <div class="navmenu">
      <router-link to="/"><fa icon="home" class="fa-4x" /></router-link> |
      <router-link to="/products"><i class="fas fa-comments-dollar fa-4x"></i></router-link> |
      <router-link to="/notication"><fa icon="bell" class="fa-4x" /></router-link>
    </div>
    <div class="langmenu">
      <router-link to="/"><fa icon="language" class="fa-4x" /></router-link>
    </div>
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
      <button v-show="moveTop" @click="scrollTop()" class="mytopBtn" title="Go to top">
      <fa icon="angle-double-up" class="fa-2x" />
  </button>
</template>

<script>
  import AOS from 'aos';
  import 'aos/dist/aos.css';

  export default {
    data () {
      return {
        moveTop: false,
      }
    },
    created(){
      AOS.init();
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          this.moveTop = true;
          var relativefooter = document.getElementById("footer");
          relativefooter.style.position = "relative";
        } else {
         this.moveTop = false;
          var fixfooter = document.getElementById("footer");
          fixfooter.style.position = "fixed";
        }
      },
      scrollTop(){
        window.scrollTo(0,0);
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Battambang', cursive;
  }

  .brand {
    margin-left: 0;
    font-size: 18px;
    font-weight: 900;
  }

  .navmenu {
    margin: auto;
    width: 50%;
    text-align: center;
  }

  .langmenu {
    margin-right: 0;
    font-size: 18px;
    font-weight: 900;
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
    display: flex;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: $link-color;
      }
    }
  }
</style>
