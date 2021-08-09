<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 px-2 my-3">
        <div class="card p-3">
          <form class="row row-cols-lg-auto g-3 align-items-center">
            <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Category</div>
                  <select v-model="searchObj.category" class="form-select py-2">
                    <option selected value="0">All</option>
                    <option v-for="item in categoryList" :key="item" :value="`${item._id}`">{{
                      item.title
                    }}</option>
                  </select>
                </div>
              </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">Title</div>
                <input
                  v-model="searchObj.title"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">Description</div>
                <input
                  v-model="searchObj.description"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">From Price</div>
                <input
                  v-model="searchObj.fromprice"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">To Price</div>
                <input
                  v-model="searchObj.toprice"
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>
            <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Currency</div>
                  <select v-model="searchObj.currency" class="form-select py-2">
                    <option selected value="0">Open this select</option>
                    <option v-for="item in currencyList" :key="item" :value="`${item._id}`">{{
                      item.symbol
                    }}</option>
                  </select>
                </div>
              </div>

            <div class="col-12">
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button" @click="findData('getproductSearchList')">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-9 px-2 my-3">
        <div class="card p-3">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="item in 10" :key="item" class="col">
              <div class="card h-100">
                <img
                  src="https://via.placeholder.com/350"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.{{item}}
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { computed } from "vue";
import useRepositories from "../utility/uirepositories";

export default {
   setup() {
     const {store,findData,nextData,prevData} 
    = useRepositories(['getproductProps','getcategoryAll','getcurrencyAll']);
    const searchObj = {
        pageSize: 2,
        page: 1
    };
    return {
      productList: computed(() => store.getters.getproductList),
      categoryList: computed(() => store.getters.getcategoryList),
      currencyList: computed(() => store.getters.getcurrencyList),
     searchObj,
     findData,
     nextData,
     prevData
    }
   }
};
</script>

<style lang="scss">

</style>
