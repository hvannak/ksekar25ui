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
              name="email"
              class="form-control"
              placeholder="Username"
              v-model="userObj.email"
            />          
          </div>
          <div v-if="v$.email.$invalid">Value is not a valid email address</div>
        </div>
        <div class="col-6 offset-3">
          <div class="input-group">
            <div class="input-group-text"><fa icon="key" class="fa-2x" /></div>
            <input
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
              v-model="userObj.password"
            />
          </div>
          <div v-if="v$.password.$invalid">Value is required 6 digit</div>
        </div>
        <div class="col-6 offset-3">
            <div class="d-grid gap-2">
                <button :disabled="v$.$invalid" @click="loginUser()" class="btn btn-primary" type="submit">Login</button>
            </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required, minLength } from '@vuelidate/validators'

  export default {
    setup () {
      const store = useStore();
      const userObj = reactive({
        email: '',
        password: ''
      });
      const rules = {
        email: { required, email },
        password: { required, minLength: minLength(6) }
      };
      const v$ = useVuelidate(rules, userObj);

      return {
        userObj,
        v$,
        loginUser: () => {
          store.dispatch('loginUser',userObj)
        }
      }
    }
    
  };
</script>

<style></style>
