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
                @click="onFind()"
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
          <th scope="col">Title<fa :icon="`${sortIcon}`" class="pointer" @click="onSort('title')" /></th>
          <th scope="col">Short Code<fa :icon="`${sortIcon}`" class="pointer" @click="onSort('shortcode')" /></th>
          <th scope="col">Default<fa :icon="`${sortIcon}`" class="pointer" @click="onSort('default')" /></th>
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
        <tr v-for="(item, index) in languageList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.title }}</td>
          <td>{{ item.shortcode }}</td>
          <td>{{ item.default }}</td>
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
                    @click="onPrev()"
                  />
                </li>
                <li class="page-item">
                  {{ pageObj.page }} Of {{ languageDoc }}
                </li>
                <li class="page-item">
                  <fa
                    icon="arrow-circle-right"
                    class="fa-2x pointer"
                    @click="onNext()"
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
              Language Input
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
                    v-model="langObj.title"
                  />
                </div>
                <div v-if="v$.title.$invalid">Value is required 4 digits</div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Short Code</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="langObj.shortcode"
                  />
                </div>
                <div v-if="v$.shortcode.$invalid">
                  Value is required 2 digits
                </div>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    v-model="langObj.default"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Default
                  </label>
                </div>
                <div v-if="v$.default.$invalid">Value is required</div>
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
              @click="onSave()"
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
            <h5 class="modal-title" id="deleteModalLabel">Language Delete</h5>
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
              @click="onDelete()"
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
import { useStore } from "vuex";
import {ref, reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup() {
    let sortIcon = ref('sort-up');
    let pageObj = {
      pageSize: 1,
      page: 1,
      sortBy: "_id",
      sortType: "asc",
      searchObjby: "0",
      searchObj: "",
    };
    const store = useStore();
    store.dispatch("getLanguageProps");
    store.dispatch("getLanguageList", pageObj);
    const initObj = {
      _id: "",
      title: "",
      shortcode: "",
      default: false,
    };
    let langObj = reactive({ initObj });
    const rules = {
      title: { required, minLength: minLength(4) },
      shortcode: { required, minLength: minLength(2) },
      default: { required },
    };
    const v$ = useVuelidate(rules, langObj);

    return {
      props: computed(() => store.getters.getLanguageProps),
      languageList: computed(() => store.getters.getLanguageList),
      languageDoc: computed(() => store.getters.getlanguageTotalDoc),
      sortIcon,
      pageObj,
      langObj,
      v$,
      onShow: (item) => {
        if (item == null) Object.assign(langObj, initObj);
        else Object.assign(langObj, item);
      },
      onSave: () => {
        if (langObj._id.length > 0) {
          store.dispatch("putLanguage", langObj);
        } else {
          store.dispatch("postLanguage", langObj);
        }
      },
      onDelete: () => {
        store.dispatch("deleteLanguage", langObj._id);
      },
      onFind: () => {
        pageObj.page = 1;
        store.dispatch("getLanguageList", pageObj);
      },
      onPrev: () => {
        if (pageObj.page > 1) {
          pageObj.page = pageObj.page - 1;
          store.dispatch("getLanguageList", pageObj);
        }
      },
      onNext: () => {
        if (pageObj.page < store.getters.getlanguageTotalDoc) {
          pageObj.page = pageObj.page + 1;
          store.dispatch("getLanguageList", pageObj);
        }
      },
      onSort: (prop) => {
        pageObj.sortBy = prop;
        pageObj.sortType = (pageObj.sortType == 'asc') ? 'desc' : 'asc';
        sortIcon.value = (sortIcon.value == 'sort-down') ? 'sort-up' : 'sort-down';
        store.dispatch("getLanguageList", pageObj);
      }
    };
  },
};
</script>

<style></style>
