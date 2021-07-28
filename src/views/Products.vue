<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 px-2 my-3">
        <div class="card p-3">
          <form class="row row-cols-lg-auto g-3 align-items-center">
            <div class="col-12">
              <select class="form-select" id="inlineFormSelectPref">
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">Name</div>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">Description</div>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">From Price</div>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="input-group">
                <div class="input-group-text">To Price</div>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputGroupUsername"
                />
              </div>
            </div>

            <div class="col-12">
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-9 px-2 my-3">
        <div class="card p-3">
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="item in 10" :key="item" class="col">
              <div class="card h-100">
                <img
                  src="https://via.placeholder.com/350"
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.{{item}}
                  </p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
    data () {
      return {
        
      }
    },
};
</script>

<style lang="scss">

</style>
