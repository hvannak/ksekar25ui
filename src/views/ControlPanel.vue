<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 px-0 my-1">
          <div class="accordion accordion-flush" id="accordionFlushExample">
              <div v-for="item in 10" :key="item" class="accordion-item">
                <h2 class="accordion-header" :id="`flush-heading${item}`" />
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapse${item}`" aria-expanded="false" :aria-controls="`flush-collapse${item}`">
                    Setting #{{item}}
                </button>
                <div :id="`flush-collapse${item}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                    <div class="d-grid gap-2">
                        <button type="button" class="btn btn-light btn-lg">Light</button>
                    </div>
                </div>
                </div>
              </div>
          </div>
      </div>
      <div class="col-9 px-0 my-1">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>