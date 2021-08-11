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
                @click="findData('getnotificationList')"
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
          <th scope="col">Title<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('title','getnotificationList')" /></th>
          <th scope="col">Language<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('language','getnotificationList')" /></th>
          <th scope="col">Description<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('description','getnotificationList')" /></th>
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
        <tr v-for="(item, index) in notificationList" :key="index">
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
                    @click="prevData('getnotificationList')"
                  />
                </li>
                <li class="page-item">
                  {{ pageObj.page }} Of {{ notificationDoc }}
                </li>
                <li class="page-item">
                  <fa
                    icon="arrow-circle-right"
                    class="fa-2x pointer"
                    @click="nextData(notificationDoc,'getnotificationList')"
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
              Notification Input
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
                    v-model="notificationObj.title"
                  />
                </div>
                <div v-if="v$.title.$invalid">Value is required 4 digits</div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Description</div>
                  <textarea
                    class="form-control"
                    v-model="notificationObj.description"
                  />
                </div>
                <div v-if="v$.description.$invalid">
                  Value is required 2 digits
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Language</div>
                  <select v-model="notificationObj.lang" class="form-select py-2">
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
              @click="`${notificationObj._id.length > 0 ? saveData(notificationObj,'putNotification') : saveData(notificationObj,'postNotification')}`"
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
            <h5 class="modal-title" id="deleteModalLabel">Notification Delete</h5>
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
              @click="deleteData(notificationObj._id,'deleteNotification')"
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
    = useRepositories('getnotificationList',['getnotificationProps','getLanguageAll']);
    const initObj = {
      _id: "",
      title: "",
      lang: "0",
      description: "",
    };
    let notificationObj = reactive({ initObj });
    const rules = {
      title: { required, minLength: minLength(4) },
      lang: { required, minLength: minLength(2) },
      description: { required },
    };
    const v$ = useVuelidate(rules, notificationObj);

    return {
      props: computed(() => store.getters.getnotificationProps),
      notificationList: computed(() => store.getters.getnotificationList),
      languageList: computed(() => store.getters.getLanguageList),
      notificationDoc: computed(() => store.getters.getnotificationTotalDoc),
      sortIcon,
      pageObj,
      notificationObj,
      v$,
      onShow: (item) => {
        if (item == null) Object.assign(notificationObj, initObj);
        else Object.assign(notificationObj, {
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
      prevData     
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
