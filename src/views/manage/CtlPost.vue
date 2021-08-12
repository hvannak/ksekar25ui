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
                @click="findData('getpostList')"
              >
                Find
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-if="postWaiting" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" style="width: 1vw;">#</th>
          <th scope="col" style="width: 7vw;">Title<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('title','getpostList')" /></th>
          <th scope="col" style="width: 7vw;">Language<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('lang','getpostList')" /></th>
          <th scope="col" style="width: 65vw;">Description<fa :icon ="`${sortIcon}`" class="pointer" @click="sortData('description','getpostList')" /></th>
          <th scope="col" style="width: 7vw;">
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
        <tr v-for="(item, index) in postList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.lang.title }}</td>
          <td><div class="wraptext">{{ item.description }}</div></td>
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
                    @click="prevData('getpostList')"
                  />
                </li>
                <li class="page-item">
                  {{ pageObj.page }} Of {{ postDoc }}
                </li>
                <li class="page-item">
                  <fa
                    icon="arrow-circle-right"
                    class="fa-2x pointer"
                    @click="nextData(postDoc,'getpostList')"
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
              Post Input
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
                    v-model="postObj.title"
                  />
                </div>
                <div v-if="v$.title.$invalid">Value is required 4 digits</div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Language</div>
                  <select v-model="postObj.lang" class="form-select py-2">
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
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Description</div>
                  <textarea 
                    class="form-control"
                    v-model="postObj.description"
                  />
                </div>
                <div v-if="v$.description.$invalid">
                  Value is required 10 digits
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">
                    <fa icon="file" /> | 450x450
                  </div>
                  <input
                    type="file"
                    class="form-control"
                    @change="fileData($event)"
                  />
                </div>
                <!-- <div v-if="v$.image.$invalid">
                  Value is required
                </div> -->
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
              @click="`${postObj._id.length > 0 ? saveData(postObj,'putPost') : saveData(postObj,'postPost')}`"
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
            <h5 class="modal-title" id="deleteModalLabel">Post Delete</h5>
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
              @click="deleteData(postObj._id,'deletePost')"
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
    = useRepositories('getpostList',['getpostProps','getLanguageAll']);
    const initObj = {
      _id: "",
      title: "",
      lang: "0",
      description: "",
      image: ""
    };
    let postObj = reactive({ initObj });
    const rules = {
      title: { required, minLength: minLength(4) },
      lang: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(10) },
      image: {  },
    };
    const v$ = useVuelidate(rules, postObj);
    const fileData = (event) => {
      const files = event.target.files
      const reader = new FileReader()
      reader.onload = function(e) {
        postObj.image = e.target.result;
      }.bind(this);
      reader.readAsDataURL(files[0])
    }

    return {
      props: computed(() => store.getters.getpostProps),
      postList: computed(() => store.getters.getpostList),
      languageList: computed(() => store.getters.getLanguageList),
      postDoc: computed(() => store.getters.getpostTotalDoc),
      postWaiting: computed(() => store.getters.getpostWaiting),
      sortIcon,
      pageObj,
      postObj,
      v$,
      onShow: (item) => {
        if (item == null) Object.assign(postObj, initObj);
        else Object.assign(postObj, {
          _id: item._id,
          title: item.title,
          lang: item.lang._id,
          description: item.description
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

<style>
  .wraptext {
    height: 20px;
    overflow: hidden;
  }
</style>
