<template>
  <div class="card mx-5 my-5">
    <div class="card-header bg-transparent border-success">
      <fa icon="unlock" class="fa-2x" />
    </div>
    <div class="card-body">
      <form class="row row-cols-lg-auto g-3 align-items-center my-3 ">
        <div class="col-6 offset-3">
          <div class="input-group">
            <div class="input-group-text"><fa icon="user" class="fa-2x" /></div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Username"
            />
          </div>
        </div>
        <div class="col-6 offset-3">
          <div class="input-group">
            <div class="input-group-text"><fa icon="key" class="fa-2x" /></div>
            <input
              type="text"
              class="form-control"
              id="inlineFormInputGroupUsername"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="col-6 offset-3">
            <div class="d-grid gap-2">
            <button class="btn btn-primary" type="button">Login</button>
            </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
