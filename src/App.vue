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
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          <fa icon="language" class="fa-3x" />
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li v-for="(item,index) in languageList" :key="index" class="dropdown-item pointer" @click="switchLang(item)">
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
  <router-view />
  <div id="footer">
    <p>&copy; - កសិករ២៥ - {{localizeProperty(localizationList,'contact_us')}}៖ 078 949 799 - vannak2010@gmail.com</p>
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
  import {ref,computed,provide } from "vue";
  import { useStore } from "vuex";
  import {localizeProperty} from "./utility/helper";

  export default {  
    setup() {
      AOS.init();
      const moveTop = ref(false);
      const scrollTop = () => {
        window.scrollTo(0,0);
      };

      const language = ref(localStorage.getItem('language'));
      const store = useStore();
      store.dispatch('getLanguageAll');
      store.dispatch('getlocalizationSwitch',language.value);
      provide('language',language);
      const handleScroll = (event) => {
        if(event.target.scrollingElement.scrollTop > 0){
          moveTop.value = true;
          var relativefooter = document.getElementById("footer");
          relativefooter.style.position = "relative";
        } else {
          moveTop.value = false;
          var fixfooter = document.getElementById("footer");
          fixfooter.style.position = "fixed";
        }
      };
      window.addEventListener('scroll', handleScroll);
      const switchLang = (item) => {
        console.log(item._id);
        localStorage.setItem('language',item._id);
        store.dispatch('getlocalizationSwitch',item._id);
        language.value = item._id;
      }
      return {
        moveTop,
        scrollTop,
        languageList: computed(() => store.getters.getLanguageList),
        localizationList: computed(() => store.getters.getlocalizationList),
        localizeProperty,
        switchLang
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
