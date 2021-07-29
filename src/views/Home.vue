<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 px-0 my-1">
        <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <template v-for="item in count" :key="item" >
                <div v-if="item==1" class="carousel-item active">
                  <img src="https://via.placeholder.com/1024x300" class="d-block w-100" alt="...">
                </div>
                <div v-else class="carousel-item">
                  <img src="https://via.placeholder.com/1024x300" class="d-block w-100" alt="...">
                </div>
            </template>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    <template v-for="item in count" :key="item">
      <div v-if="item%2" class="col-12" data-aos="fade-up">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="https://via.placeholder.com/450" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse alias perspiciatis eos ducimus atque maxime nobis, sint sequi odit omnis impedit? Molestias quam suscipit voluptas voluptatem sit dolorem doloremque porro hic unde non quo perferendis quod earum, totam eveniet aut nostrum sequi at est cumque. Quos eligendi dolorem qui aut ipsa accusamus fugiat in obcaecati ab non fuga, repellat tempora at tempore animi explicabo praesentium nam quam provident sapiente veniam similique delectus maxime! Aut sequi totam obcaecati autem! Atque deleniti possimus consectetur magnam consequatur labore non. Iure dolorum excepturi cumque. Numquam architecto esse doloremque, eaque voluptatibus quisquam suscipit fugit unde, deleniti cupiditate voluptas officiis dolore. Ab vitae nostrum praesentium, eveniet eum consequatur doloremque doloribus sequi provident soluta debitis libero quae repudiandae quam, veritatis quisquam facilis deserunt animi commodi. Nihil dolores animi quis delectus aliquid et, sunt recusandae eos incidunt vitae ipsum laudantium nesciunt eveniet saepe ratione facere voluptatibus ducimus! Nam, eveniet vel porro reiciendis ullam ex suscipit eius ipsam, eum praesentium quod, rerum aut saepe! Natus ipsum tempora dicta doloremque sint optio odit omnis repellat aspernatur recusandae sunt minus sed corporis, eius atque veniam hic cum enim quibusdam quo. Libero pariatur quos quas est quod totam molestiae inventore possimus minima?</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="col-12" data-aos="fade-up">
        <div class="card mb-3">
          <div class="row  g-0">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias obcaecati aperiam dolore qui magni rerum nemo iste, repudiandae, illum, libero et quam ipsa optio cumque cupiditate necessitatibus voluptates ullam corporis deserunt? Vel molestias obcaecati impedit hic quo cumque provident, possimus voluptatum officia, eveniet sunt nostrum voluptas nisi ad beatae architecto illum, vitae ab corporis totam debitis earum. Necessitatibus libero deleniti maiores aperiam hic adipisci vitae rem maxime facilis architecto mollitia, recusandae molestiae. Necessitatibus ducimus nihil inventore vero odit laboriosam veritatis omnis, porro harum totam perspiciatis in rem nisi! Facilis aperiam nisi, eaque modi ab pariatur perferendis quod tempore corporis accusamus totam earum cum et aliquam enim expedita. Obcaecati commodi ea pariatur, delectus quia nemo impedit doloribus minus eum qui aspernatur maxime ipsum autem dolor provident quam. Sit magni ad rerum perferendis iusto ullam veniam sunt similique, id ratione necessitatibus, repellat, quae molestias assumenda laborum recusandae natus autem unde. Cum, corporis.</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex justify-content-end">
                <img src="https://via.placeholder.com/450" class="img-fluid rounded-start" alt="...">
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import { ref } from 'vue'

  export default {
    components: {
     
    },
    data () {
      return {
      }
    },
    methods: {

    },
    setup(){
      const count = ref(10);
      
      return {
        count
      }
    }
  }
</script>
