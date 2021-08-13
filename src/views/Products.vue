<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 px-2 my-3">
        <div class="card p-3">
          <form class="row row-cols-lg-auto g-3 align-items-center">
            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">{{localizeProperty(localizationList,'category')}}</div>
                <select v-model="productObj.category" class="form-select py-2">
                  <option selected value="0">{{localizeProperty(localizationList,'all')}}</option>
                  <option
                    v-for="item in categoryList"
                    :key="item"
                    :value="`${item._id}`"
                    >{{ item.title }}</option
                  >
                </select>
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">{{localizeProperty(localizationList,'title')}}</div>
                <input
                  v-model="productObj.title"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">{{localizeProperty(localizationList,'description')}}</div>
                <input
                  v-model="productObj.description"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">{{localizeProperty(localizationList,'fromprice')}}</div>
                <input
                  v-model="productObj.fromprice"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">{{localizeProperty(localizationList,'toprice')}}</div>
                <input
                  v-model="productObj.toprice"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>
            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">{{localizeProperty(localizationList,'currency')}}</div>
                <select v-model="productObj.currency" class="form-select py-2">
                  <option selected value="0">{{localizeProperty(localizationList,'open_this_select')}}</option>
                  <option
                    v-for="item in currencyList"
                    :key="item"
                    :value="`${item._id}`"
                    >{{ item.symbol }}</option
                  >
                </select>
              </div>
            </div>

            <div class="col-12">
              <div class="d-grid gap-2">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="findDoc(true,false)"
                >
                  {{localizeProperty(localizationList,'search')}}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="card mt-3">
          <div class="card-header text-center bg-success">
            {{localizeProperty(localizationList,'promotion')}}
          </div>
          <div class="card-body">
            <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <template v-for="(item,index) in promotionList" :key="index">
                  <div v-if="index==0" class="carousel-item active">
                    <div class="img">
                      <img :src="`${readBufferImg(item.image)}`" class="d-block img-fluid w-100" alt="...">
                    </div>
                  </div>
                  <div v-else class="carousel-item">
                    <div class="img">
                      <img :src="`${readBufferImg(item.image)}`" class="d-block img-fluid w-100" alt="...">
                    </div>                  
                  </div>
                </template>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 px-2 my-3">
        <div v-if="productWaiting" class="d-flex justify-content-center my-5">
          <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <template v-else>
          <div class="card p-3">
            <div class="row row-cols-1 row-cols-md-3 g-4">
              <div v-for="item in productList" :key="item" class="col">
                <div class="card h-100">
                  <div class="img">
                    <img
                      :src="`${readBufferImg(item.image)}`"
                      class="card-img-top img-fluid"
                      alt="..."
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <h3 class="card-title">{{ item.price }}|{{item.currency.symbol}}</h3>
                    <p class="card-text">
                      {{ item.description }}
                    </p>
                  </div>
                  <div class="card-footer">
                    <small class="text-muted"
                      >{{localizeProperty(localizationList,'last_updated')}}
                      {{ item.date.substring(0,10) }}</small
                    >
                  </div>
                </div>
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
              <li class="page-item">{{ productObj.page }} {{localizeProperty(localizationList,'of')}} {{ productDoc }}</li>
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
      </div>
    </div>
    
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import useRepositories from "../utility/uirepositories";
import {readBufferImg,localizeProperty} from "../utility/helper";

export default {
  setup() {
    let productObj = reactive({
      pageSize: 9,
      page: 1,
      title: "",
      category: "0",
      description: "",
      fromprice: "",
      toprice:"",
      currency: "0",
    });
    const { store, findData } = useRepositories(
      { action: "getproductSearchList", param: productObj },
      ["getcategoryAll", "getcurrencyAll","getpromotionAll"]
    );
    const findDoc = (search, next) => {
      if (search == true) {
        productObj.page = 1;
      } else {
        if (next == true) {
          if (productObj.page < store.getters.getproductTotalDoc) {
            productObj.page = productObj.page + 1;
          }
        } else {
          if (productObj.page > 1) {
            productObj.page = productObj.page - 1;
          }
        }
      }
      findData("getproductSearchList", productObj);
    };
    return {
      productList: computed(() => store.getters.getproductList),
      promotionList: computed(() => store.getters.getpromotionList),
      categoryList: computed(() => store.getters.getcategoryList),
      currencyList: computed(() => store.getters.getcurrencyList),
      productDoc: computed(() => store.getters.getproductTotalDoc),
      productWaiting: computed(() => store.getters.getproductWaiting),
      localizationList: computed(() => store.getters.getlocalizationList),
      productObj,
      findDoc,
      readBufferImg,
      localizeProperty
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
</style>
