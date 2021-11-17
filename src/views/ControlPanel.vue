<template>
  <nav class="navbar navbar-light bg-light justify-content-between">
    <router-link to="/views/home"><fa icon="tractor" class="fa-4x mx-3" />កសិករ២៥</router-link>
    <span class="iconline mx-3" @click="logOut()"><fa icon="users-cog" class="fa-2x" /></span>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 px-0 my-1">
          <div class="accordion accordion-flush" id="accordionFlushExample">
            <div v-for="(item,index) in appMenu" :key="index" class="accordion-item">
              <h2 class="accordion-header" :id="`flush-heading${index}`" />
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapse${index}`" aria-expanded="false" :aria-controls="`flush-collapse${index}`">
                    <fa :icon="`${item.icon}`" class="fa-2x" />{{item.title}}
              </button>
              <div :id="`flush-collapse${index}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div v-for="(panel,i) in routerData" :key="i" class="accordion-body">
                    <div v-for="(menu,j) in panel.children.filter(x=>x.meta.group == item.name)" :key="j" class="d-grid my-2 gap-2">
                        <button type="button" class="btn btn-light btn-lg">
                          <router-link :to="`${panel.path + '/' + menu.path}`">{{menu.meta.title}}</router-link>                        
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="col-9 px-0 my-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import appMenu from '../appSetting.json'

export default {
  setup(){
    const router = useRouter();
    const logOut = () => {
      localStorage.removeItem('token');
      router.push({ name: "Home" });
    };
    let routerData = router.options.routes.filter(x=>x.name == 'ControlPanel');
    return {
      routerData,
      appMenu,
      logOut
    }
  }
}
</script>

<style lang="scss">
 .iconline:hover {
    color: $hover-color;
  }
</style>