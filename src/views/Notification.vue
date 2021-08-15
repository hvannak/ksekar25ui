<template>
  <div v-for="item in notificationList" :key="item" class="card-group mx-2 my-2">
    <div class="card">
      <div class="card-header bg-transparent border-success">
        <fa icon="bell" class="fa-2x" />
      </div>
      <div class="card-body">
        <h5 class="card-title">{{item.title}}</h5>
        <p class="card-text">
          {{item.description}}
        </p>
      </div>
      <div class="card-footer">
        <small class="text-muted">{{localizeProperty(localizationList,'last_updated')}}
                      {{ item.date.substring(0,10) }}</small>
      </div>
    </div>
  </div>
  <nav class="my-3">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <fa
          icon="arrow-circle-left"
          class="fa-2x pointer"
          @click="findDoc(false,false)"
        />
      </li>
      <li class="page-item">{{ notificationObj.page }} {{localizeProperty(localizationList,'of')}} {{ notificationDoc }}</li>
      <li class="page-item">
        <fa
          icon="arrow-circle-right"
          class="fa-2x pointer"
          @click="findDoc(false,true)"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import { reactive, computed,inject,watch } from "vue";
import useRepositories from "../utility/uirepositories";
import {localizeProperty} from "../utility/helper";

export default {
  setup() {
    const language = inject('language');
    let notificationObj = reactive({
      pageSize: 9,
      page: 1,
      lang:language.value
    });
    const { store, findData,watchData } = useRepositories(
      [{ action: "getnotificationSearchList", param: notificationObj }],[]
    );
    watch(language, (language, prevlanguage) => {
      if(language != prevlanguage){
        notificationObj.lang = language;
        watchData([{ action: "getnotificationSearchList", param: notificationObj }]);
      }
    })
    const findDoc = (search, next) => {
      if (next == true) {
        if (notificationObj.page < store.getters.getnotificationTotalDoc) {
          notificationObj.page = notificationObj.page + 1;
        }
      } else {
        if (notificationObj.page > 1) {
          notificationObj.page = notificationObj.page - 1;
        }
      }
      findData("getnotificationSearchList", notificationObj);
    };
    return {
      notificationList: computed(() => store.getters.getnotificationList),
      notificationDoc: computed(() => store.getters.getnotificationTotalDoc),
      localizationList: computed(() => store.getters.getlocalizationList),
      notificationObj,
      findDoc,
      localizeProperty
    };
  },
};
</script>
<style scoped>

</style>