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
                @click="findData('getuserList')"
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
          <th scope="col">Name<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('title','getuserList')" /></th>
          <th scope="col">Email<fa :icon="`${sortIcon}`" class="pointer" @click="sortData('shortcode','getuserList')" /></th>        
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
        <tr v-for="(item, index) in userList" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
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
                    @click="prevData('getuserList')"
                  />
                </li>
                <li class="page-item">
                  {{ pageObj.page }} Of {{ userDoc }}
                </li>
                <li class="page-item">
                  <fa
                    icon="arrow-circle-right"
                    class="fa-2x pointer"
                    @click="nextData(userDoc,'getuserList')"
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
              User Input
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
                  <div class="input-group-text">Name</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="userObj.name"
                  />
                </div>
                <div v-if="v$.name.$invalid">Value is required 4 digits</div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Email</div>
                  <input
                    type="text"
                    class="form-control"
                    v-model="userObj.email"
                  />
                </div>
                <div v-if="v$.email.$invalid">
                  Value is email required 
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Password</div>
                  <input
                    type="password"
                    class="form-control"
                    v-model="userObj.password"
                  />
                </div>
                <div v-if="v$.password.$invalid">
                  Value is required 6 digits
                </div>
              </div>
              <div class="col-12">
                <div class="input-group">
                  <div class="input-group-text">Confirm Password</div>
                  <input
                    type="password"
                    class="form-control"
                    v-model="userObj.confirmpassword"
                  />
                </div>
                <div v-if="v$.confirmpassword.$invalid">
                    {{v$.confirmpassword.sameAsPassword}}
                  Value is required to confirm
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
              @click="`${userObj._id.length > 0 ? saveData(userObj,'putUser') : saveData(userObj,'postUser')}`"
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
            <h5 class="modal-title" id="deleteModalLabel">User Delete</h5>
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
              @click="deleteData(userObj._id,'deleteUser')"
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
import { required, minLength,email,sameAs } from "@vuelidate/validators";
import useRepositories from "../../utility/repositories";

export default {
  setup() {
    const {sortIcon,pageObj,store,sortData,deleteData,findData,nextData,prevData,saveData} 
    = useRepositories('getuserList',['getuserProps']);
    const initObj = {
      _id: "",
      name: "",
      email: "",
      password: "",
      confirmpassword: ""
    };
    let userObj = reactive({ initObj });
    const rules = {
      name: { required, minLength: minLength(4) },
      email: { required,email, minLength: minLength(2) },
      password: { required,minLength: minLength(6) },
      confirmpassword: {sameAsPassword: sameAs(computed(() => userObj.password))}
    };
    const v$ = useVuelidate(rules, userObj);

    return {
      props: computed(() => store.getters.getuserProps),
      userList: computed(() => store.getters.getuserList),
      userDoc: computed(() => store.getters.getuserTotalDoc),
      sortIcon,
      pageObj,
      userObj,
      v$,
      onShow: (item) => {
        if (item == null) Object.assign(userObj, initObj);
        else Object.assign(userObj,item);
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
