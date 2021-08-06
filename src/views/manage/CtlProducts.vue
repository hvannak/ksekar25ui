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
                @click="findData('getcategoryList')"
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
          <th scope="col">Title<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('title','getcategoryList')" /></th>
          <th scope="col">Language<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('shortcode','getcategoryList')" /></th>
          <th scope="col">Icon<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('default','getcategoryList')" /></th>
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
        <tr v-for="(item, index) in categoryList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.lang.title }}</td>
          <td>{{ item.icon }}</td>
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
                    @click="prevData('getcategoryList')"
                  />
                </li>
                <li class="page-item">
                  {{ pageObj.page }} Of {{ categoryDoc }}
                </li>
                <li class="page-item">
                  <fa
                    icon="arrow-circle-right"
                    class="fa-2x pointer"
                    @click="nextData(categoryDoc,'getcategoryList')"
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
              Category Input
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
                    v-model="categoryObj.title"
                  />
                </div>
                <div v-if="v$.title.$invalid">Value is required 4 digits</div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Icon</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="categoryObj.icon"
                  />
                </div>
                <div v-if="v$.icon.$invalid">
                  Value is required 2 digits
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Language</div>
                  <select v-model="categoryObj.lang" class="form-select py-2">
                    <option selected value="0">Open this select</option>
                    <option v-for="item in languageList" :key="item" :value="`${item._id}`">{{
                      item.title
                    }}</option>
                  </select>
                </div>
                <div v-if="v$.lang.$invalid">
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
              @click="`${categoryObj._id.length > 0 ? saveData(categoryObj,'putCategory') : saveData(categoryObj,'postCategory')}`"
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
              @click="deleteData(categoryObj._id,'deleteCategory')"
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
    = useRepositories('getcategoryList',['getcategoryProps','getLanguageAll']);
    const initObj = {
      _id: "",
      title: "",
      lang: "0",
      icon: "",
    };
    let categoryObj = reactive({ initObj });
    const rules = {
      title: { required, minLength: minLength(4) },
      lang: { required, minLength: minLength(2) },
      icon: { required },
    };
    const v$ = useVuelidate(rules, categoryObj);

    return {
      props: computed(() => store.getters.getcategoryProps),
      categoryList: computed(() => store.getters.getcategoryList),
      languageList: computed(() => store.getters.getLanguageList),
      categoryDoc: computed(() => store.getters.getcategoryTotalDoc),
      sortIcon,
      pageObj,
      categoryObj,
      v$,
      onShow: (item) => {
        if (item == null) Object.assign(categoryObj, initObj);
        else Object.assign(categoryObj, {
          _id: item._id,
          title: item.title,
          lang: item.lang._id,
          icon: item.icon
        });
      },
      saveData,
      findData,
      deleteData,
      sortData,
      nextData,
      prevData     
    };
  },
};
</script>

<style></style>
