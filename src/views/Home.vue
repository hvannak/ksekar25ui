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
    <!-- <div class="mySlider">
        <SwiperSlider/>
    </div>
    <div v-for="item in count" :key="item" class="flex-container">
      <template v-if="item%2">
        <div v-bind:class="item1">
          <img src="https://via.placeholder.com/450" data-aos="fade-up">
        </div>
        <div v-bind:class="item2" data-aos="fade-up">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum in blanditiis necessitatibus cupiditate tempora hic, deserunt possimus quam ab commodi, ratione amet fugiat dignissimos. Voluptates deserunt amet nihil. Obcaecati consectetur vel eligendi cum. Harum eum consequatur, adipisci quos molestias maxime quisquam rem illum iusto maiores nesciunt ipsa voluptate facere voluptas amet voluptatibus ratione repellat earum rerum eveniet iure sapiente. Accusantium quam nulla atque voluptate enim sapiente sit blanditiis nemo mollitia, culpa obcaecati facilis ea dolore eos quaerat quo id, laborum impedit ex illo assumenda vero? Voluptate nesciunt provident obcaecati exercitationem, voluptatem suscipit alias atque deleniti minima. Vero quas facere error id dicta placeat consectetur qui itaque, in culpa debitis et, repellendus dolore eaque velit earum aliquam saepe voluptatum sapiente, magnam aliquid ipsam beatae? Eos optio molestiae enim facilis amet incidunt itaque ex quibusdam nostrum suscipit, dolores voluptatem assumenda nulla velit iste distinctio veritatis. Tempora ab repellat saepe eius nobis temporibus eos assumenda commodi fugiat! Eum blanditiis quia libero itaque facere dignissimos a et, modi corrupti harum voluptatem dolores vero nam in ipsam amet qui dolore suscipit odio cupiditate. Magni repellat earum aut dolores saepe velit deleniti omnis blanditiis dolorum aliquam ad tenetur tempora fuga illo, placeat dolor similique qui explicabo ratione, nihil corporis dicta! Doloremque accusantium facere explicabo repellat beatae tempore quasi nisi saepe quaerat animi blanditiis deserunt quas qui consequatur aliquam officiis fuga iste, provident vero error ut cum aspernatur excepturi iusto? Ipsum officia necessitatibus nisi nulla commodi, dolorum molestiae ad dolore ducimus alias doloribus. In veniam cupiditate eveniet eaque perferendis doloremque hic! Dolorem quibusdam eveniet, assumenda repellat non eius ducimus cumque aliquam sapiente repudiandae tenetur molestiae dolores quasi ut omnis? Fugit, totam. Consequatur, at deleniti iste obcaecati, quia accusamus odit odio cum voluptas nemo voluptatum nulla asperiores facilis repudiandae, consectetur fugit aliquam temporibus. Dolor eos vitae a labore.
        </div>
      </template>
      <template v-else>
        <div v-bind:class="item2" data-aos="fade-up">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio officiis ratione necessitatibus dolores reiciendis, hic blanditiis vero dolor eveniet, error, libero maxime! Ad veritatis, libero nihil fuga ratione unde culpa explicabo suscipit temporibus veniam corporis ex amet consectetur cupiditate. Impedit deserunt maxime ex facilis fugiat eveniet omnis. Quae, alias, excepturi quis quisquam assumenda dolor mollitia omnis numquam accusantium est facere veritatis consequatur aliquid deleniti aperiam adipisci repudiandae rem enim, soluta cum labore veniam. Possimus expedita id commodi fuga provident vero obcaecati, totam sequi aliquid impedit facilis debitis officiis cupiditate quod. Mollitia nesciunt adipisci vel consectetur cumque blanditiis enim vitae commodi reiciendis ducimus expedita dolorum officiis hic consequuntur, distinctio, placeat minima debitis? Eius praesentium laborum qui harum possimus quis reiciendis cumque voluptatem, molestias, repellat aperiam! Facere ducimus fugiat, nobis nulla animi harum dolores esse ratione sint ipsum expedita eaque? Commodi eos hic repellendus rem modi laborum adipisci, cum fugit qui repudiandae!
        </div>
        <div v-bind:class="item1">
          <img src="https://via.placeholder.com/450" data-aos="fade-up">
        </div>
      </template>
    </div> -->
</template>

<style lang="scss">
  .flex-container {
    display: flex;
    background-color: $flex-container-color;
    max-height: 550px;
}

.flex-container > div {
    font-family: 'Battambang', cursive;
    background-color: DodgerBlue;   
    text-align: left;
    font-size: 20px;
    overflow: hidden;
  }

  .item1 {
    width: 30%;
    padding: 30px;
  }
  
  .item2 {
    width: 70%;
    padding: 30px;
  }

  .mySlider{
    padding-top: 3px;
  }
</style>

<script>
  import { ref } from 'vue'
  // import SwiperSlider from '../components/SwiperSlider.vue'

  export default {
    components: {
      // SwiperSlider
    },
    data () {
      return {
      }
    },
    methods: {

    },
    setup(){
      const count = ref(10);
      const item1 = 'item1';
      const item2 = 'item2';
      
      return {
        count,
        item1,
        item2
      }
    }
  }
</script>
