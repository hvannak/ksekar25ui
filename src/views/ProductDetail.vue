<template>
  <div class="container-fluid">
    <div class="row">      
      <div class="col-12 px-2 my-3">
        <div v-if="productWaiting" class="d-flex justify-content-center my-5">
          <div
            class="spinner-border"
            style="width: 4rem; height: 4rem;"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <template v-else>
          <div class="card p-3">
            <div class="row row-cols-1 row-cols-md-3 g-4">
              <div class="col-3">
                <div class="card h-100">
                  <div class="img">
                    <img
                      :src="`${readBufferImg(product.image)}`"
                      class="card-img-top img-fluid"
                      alt="..."
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ product.title }}</h5>
                    <h3 class="card-title">
                      {{ product.price }}|{{ product.currency.symbol }}
                    </h3>
                    <p class="card-text">
                      {{ product.description }}
                    </p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted"
                      >{{ localizeProperty(localizationList, "last_updated") }}
                      {{ product.date.substring(0, 10) }}</small
                    >
                  </div>
                </div>
              </div>

              <div class="col-9">
                <div class="card bg-light">
                  <div class="card-header text-center bg-success">
                    {{ localizeProperty(localizationList, "related") }}
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div
                        v-for="item in productList"
                        :key="item"
                        class="col-4"
                      >
                        <div v-if="product._id != item._id" class="card h-100">
                          <div class="img">
                            <img
                              :src="`${readBufferImg(item.image)}`"
                              class="card-img-top img-fluid"
                              alt="..."
                            />
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">{{ item.title }}</h5>
                            <h3 class="card-title">
                              {{ item.price }}|{{ item.currency.symbol }}
                            </h3>
                            <p class="card-text">
                              {{ item.description }}
                            </p>
                          </div>
                          <div class="card-footer">
                            <small class="text-muted"
                              >{{
                                localizeProperty(
                                  localizationList,
                                  "last_updated"
                                )
                              }}
                              {{ item.date.substring(0, 10) }}</small
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, watch } from "vue";
import useRepositories from "../utility/uirepositories";
import { readBufferImg, localizeProperty } from "../utility/helper";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const language = inject("language");
    const { store, findData, watchData } = useRepositories(
      [{ action: "getproductByCatId", param: route.params.category }],
      ["getpromotionAll"]
    );
    watch(language, (language, prevlanguage) => {
      if (language != prevlanguage) {
        watchData([
          { action: "getproductByCatId", param: route.params.category },
        ]);
      }
    });
    findData("getproductById", route.params.id);
    return {
      product: computed(() => store.getters.getproduct),
      productList: computed(() => store.getters.getproductList),
      promotionList: computed(() => store.getters.getpromotionList),
      productWaiting: computed(() => store.getters.getproductWaiting),
      localizationList: computed(() => store.getters.getlocalizationList),
      readBufferImg,
      localizeProperty,
    };
  },
};
</script>

<style lang="scss">
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-height: 350px;
  overflow: hidden;
}

.img:hover {
  cursor: pointer;
}
</style>
