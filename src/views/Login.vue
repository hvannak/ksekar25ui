<template>
  <div class="card mx-5 my-5">
    <div class="card-header bg-transparent border-success">
      <fa icon="unlock" class="fa-2x" />
    </div>
    <div class="card-body">
      <form v-on:submit.prevent class="row row-cols-lg-auto g-3 align-items-center my-3">
        <div class="col-6 offset-3">
          <div class="input-group">
            <div class="input-group-text"><fa icon="user" class="fa-2x" /></div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Username"
              v-model="userObj.email"
              required
            />
          </div>
        </div>
        <div class="col-6 offset-3">
          <div class="input-group has-validation">
            <div class="input-group-text"><fa icon="key" class="fa-2x" /></div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Password"
              v-model="userObj.password"
              required
            />
          </div>
        </div>
        <div class="col-6 offset-3">
            <div class="d-grid gap-2">
                <button @click="loginUser" class="btn btn-primary" type="submit">Login</button>
            </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { ref } from 'vue'

  export default {
    setup () {
      const userObj = ref({});
      const store = useStore();
      return {
        userObj,
        loginUser: () => store.dispatch('loginUser',userObj.value)
      }
    }
  };
</script>

<style></style>
