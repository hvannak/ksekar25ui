<template>
  <div class="container">
    <div class="card">
      <div class="card-body bg-warning">
        <div class="row">
          <form class="row">
            <div class="col-auto">
              <select v-model="pageObj.searchObjby" class="form-select py-2">
                <option selected value="0">Open this select</option>
                <option v-for="item in props" :key="item" :value="`${item}`">{{
                  item
                }}</option>
              </select>
            </div>
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                id="inputSearch"
                placeholder="Search"
                v-model="pageObj.searchObj"
              />
            </div>
            <div class="col-auto">
              <button
                type="button"
                class="btn btn-primary mb-3"
                @click="findData('getproductList')"
              >
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('title','getproductList')" /></th>
          <th scope="col">Category<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('shortcode','getproductList')" /></th>
          <th scope="col">Description<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('description','getproductList')" /></th>
          <th scope="col">Price<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('price','getproductList')" /></th>
          <th scope="col">Currency<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('currency','getproductList')" /></th>
          <th scope="col">
            <div
              class="col-auto text-center"
              data-bs-toggle="modal"
              data-bs-target="#neweditModal"
            >
              <button
                type="button"
                class="btn btn-primary"
                @click="onShow(null)"
              >
                New
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in productList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.category.title }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.currency.symbol }}</td>
          <td>
            <fa
              icon="edit"
              class="fa-2x pointer"
              data-bs-toggle="modal"
              data-bs-target="#neweditModal"
              @click="onShow(item)"
            />
            |
            <fa
              icon="trash"
              class="fa-2x pointer"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              @click="onShow(item)"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5" class="text-center">
            <nav>
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <fa
                    icon="arrow-circle-left"
                    class="fa-2x pointer"
                    @click="prevData('getproductList')"
                  />
                </li>
                <li class="page-item">
                  {{ pageObj.page }} Of {{ productDoc }}
                </li>
                <li class="page-item">
                  <fa
                    icon="arrow-circle-right"
                    class="fa-2x pointer"
                    @click="nextData(productDoc,'getproductList')"
                  />
                </li>
              </ul>
            </nav>
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- start edit dialog-modal -->
    <div
      class="modal fade"
      id="neweditModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="neweditModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="neweditModalLabel">
              Product Input
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row g-3 align-items-center">
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Title</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="productObj.title"
                  />
                </div>
                <div v-if="v$.title.$invalid">Value is required 4 digits</div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Category</div>
                  <select v-model="productObj.category" class="form-select py-2">
                    <option selected value="0">Open this select</option>
                    <option v-for="item in categoryList" :key="item" :value="`${item._id}`">{{
                      item.title
                    }}</option>
                  </select>
                </div>
                <div v-if="v$.category.$invalid">
                  Value is required
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Description</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="productObj.description"
                  />
                </div>
                <div v-if="v$.description.$invalid">
                  Value is required 10 digits
                </div>
              </div>
               <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Price</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="productObj.price"
                  />
                </div>
                <div v-if="v$.price.$invalid">
                  Value is required 1 digits
                </div>
              </div>
             <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Currency</div>
                  <select v-model="productObj.currency" class="form-select py-2">
                    <option selected value="0">Open this select</option>
                    <option v-for="item in currencyList" :key="item" :value="`${item._id}`">{{
                      item.title
                    }}</option>
                  </select>
                </div>
                <div v-if="v$.currency.$invalid">
                  Value is required
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">
                    <fa icon="file" />
                  </div>
                  <input
                    type="file"
                    class="form-control"
                    @change="fileData($event)"
                  />
                </div>
                <div v-if="v$.image.$invalid">
                  Value is required
                </div>
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              :disabled="v$.$invalid"
              @click="`${productObj._id.length > 0 ? saveData(productObj,'putProduct') : saveData(productObj,'postProduct')}`"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end edit dialog-modal -->
    <!--start delete dialog -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Category Delete</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Are you about to delete this record ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="deleteData(productObj._id,'deleteProduct')"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end delete dialog-->
  </div>
</template>

<script>
import {reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import useRepositories from "../../utility/repositories";

export default {
  setup() {
    const {sortIcon,pageObj,store,sortData,deleteData,findData,nextData,prevData,saveData} 
    = useRepositories('getproductList',['getproductProps','getcategoryAll','getcurrencyAll']);
    const initObj = {
      _id: "",
      title: "",
      category: "0",
      description: "",
      price: "",
      currency: "0",
      image: ""
    };
    let productObj = reactive({ initObj });
    const rules = {
      title: { required, minLength: minLength(4) },
      category: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(10) },
      price: { required, minLength: minLength(1) },
      currency: { required },
      image: { required },
    };
    const v$ = useVuelidate(rules, productObj);
    const fileData = (event) => {
      const files = event.target.files
      const reader = new FileReader()
      reader.onload = function(e) {
        productObj.image = e.target.result;
      }.bind(this);
      reader.readAsDataURL(files[0])
    }

    return {
      props: computed(() => store.getters.getproductProps),
      productList: computed(() => store.getters.getproductList),
      categoryList: computed(() => store.getters.getcategoryList),
      currencyList: computed(() => store.getters.getcurrencyList),
      productDoc: computed(() => store.getters.getproductTotalDoc),
      sortIcon,
      pageObj,
      productObj,
      v$,
      onShow: (item) => {
        if (item == null) Object.assign(productObj, initObj);
        else Object.assign(productObj, {
          _id: item._id,
          title: item.title,
          category: item.category._id,
          description: item.description,
          price: item.price,
          currency: item.currency,
        });
      },
      saveData,
      findData,
      deleteData,
      sortData,
      nextData,
      prevData,
      fileData     
    };
  },
};
</script>

<style></style>
