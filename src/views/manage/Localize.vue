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
                @click="findData('getlocalizationList')"
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
          <th scope="col">Property<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('props','getlocalizationList')" /></th>
          <th scope="col">Language<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('lang','getlocalizationList')" /></th>
          <th scope="col">Text<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('text','getlocalizationList')" /></th>
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
        <tr v-for="(item, index) in localizationList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.props }}</td>
          <td>{{ item.lang.title }}</td>
          <td>{{ item.text }}</td>
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
                    @click="prevData('getlocalizationList')"
                  />
                </li>
                <li class="page-item">
                  {{ pageObj.page }} Of {{ localizationDoc }}
                </li>
                <li class="page-item">
                  <fa
                    icon="arrow-circle-right"
                    class="fa-2x pointer"
                    @click="nextData(localizationDoc,'getlocalizationList')"
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
            <h5 class="modal-props" id="neweditModalLabel">
              Localization Input
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
                  <div class="input-group-text">Property</div>
                  <select v-model="localizationObj.props" class="form-select py-2">
                    <option selected value="0">Open this select</option>
                    <option v-for="item in localconstList" :key="item" :value="`${item.name}`">{{
                      item.name
                    }}</option>
                  </select>
                </div>
                <div v-if="v$.lang.$invalid">
                  Value is required
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Text</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="localizationObj.text"
                  />
                </div>
                <div v-if="v$.text.$invalid">
                  Value is required 2 digits
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Language</div>
                  <select v-model="localizationObj.lang" class="form-select py-2">
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
              @click="`${localizationObj._id.length > 0 ? saveData(localizationObj,'putLocalization') : saveData(localizationObj,'postLocalization')}`"
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
            <h5 class="modal-props" id="deleteModalLabel">Localization Delete</h5>
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
              @click="deleteData(localizationObj._id,'deleteLocalization')"
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
    = useRepositories('getlocalizationList',['getlocalizationProps','getlocalizationLocalConst','getLanguageAll']);
    const initObj = {
      _id: "",
      props: "0",
      lang: "0",
      text: "",
    };
    let localizationObj = reactive({ initObj });
    const rules = {
      props: { required, minLength: minLength(1) },
      lang: { required, minLength: minLength(2) },
      text: { required },
    };
    const v$ = useVuelidate(rules, localizationObj);

    return {
      props: computed(() => store.getters.getlocalizationProps),
      localizationList: computed(() => store.getters.getlocalizationList),
      localconstList: computed(() => store.getters.getlocalizationLocalConst),
      languageList: computed(() => store.getters.getLanguageList),
      localizationDoc: computed(() => store.getters.getlocalizationTotalDoc),
      sortIcon,
      pageObj,
      localizationObj,
      v$,
      onShow: (item) => {
        if (item == null) Object.assign(localizationObj, initObj);
        else Object.assign(localizationObj, {
          _id: item._id,
          props: item.props,
          lang: item.lang._id,
          text: item.text
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
