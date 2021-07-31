<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 px-0 my-1">
          <div v-for="(panel,i) in routerData" :key="i" class="accordion accordion-flush" id="accordionFlushExample">
              <div v-for="(item,index) in panel.children" :key="index" class="accordion-item">
                <h2 class="accordion-header" :id="`flush-heading${index}`" />
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapse${index}`" aria-expanded="false" :aria-controls="`flush-collapse${index}`">
                    <fa :icon="`${item.meta.icon}`" class="fa-2x" />{{item.name}}
                </button>
                <div :id="`flush-collapse${index}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div v-for="(menu,j) in item.children" :key="j" class="d-grid my-2 gap-2">
                        <button type="button" class="btn btn-light btn-lg">
                          <router-link :to="`${panel.path + '/' + item.path + '/' + menu.path}`">{{menu.name}}</router-link>                        
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
import { useRouter, useRoute} from 'vue-router'

export default {
  // mounted() {
  //  let router = this.$router.options.routes.filter(x=>x.name == 'ControlPanel');
  //  console.log(router);
  // },
  setup(){
    const router = useRouter();
    let routerData = router.options.routes.filter(x=>x.name == 'ControlPanel');
    console.log(routerData);
    console.log(useRoute().path);
    return {
      routerData
    }
  }
}
</script>

<style>

</style>