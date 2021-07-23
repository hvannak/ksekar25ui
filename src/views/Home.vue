<template>
  <SwiperSlider/>
  <div v-for="item in count" :key="item" class="flex-container" data-aos="zoom-out-left">
    <template v-if="item%2">
      <div v-bind:class="item1">
        <img src="https://via.placeholder.com/450" data-aos="zoom-out-left">
      </div>
      <div v-bind:class="item2" data-aos="zoom-out-right">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum in blanditiis necessitatibus cupiditate tempora hic, deserunt possimus quam ab commodi, ratione amet fugiat dignissimos. Voluptates deserunt amet nihil. Obcaecati consectetur vel eligendi cum. Harum eum consequatur, adipisci quos molestias maxime quisquam rem illum iusto maiores nesciunt ipsa voluptate facere voluptas amet voluptatibus ratione repellat earum rerum eveniet iure sapiente. Accusantium quam nulla atque voluptate enim sapiente sit blanditiis nemo mollitia, culpa obcaecati facilis ea dolore eos quaerat quo id, laborum impedit ex illo assumenda vero? Voluptate nesciunt provident obcaecati exercitationem, voluptatem suscipit alias atque deleniti minima. Vero quas facere error id dicta placeat consectetur qui itaque, in culpa debitis et, repellendus dolore eaque velit earum aliquam saepe voluptatum sapiente, magnam aliquid ipsam beatae? Eos optio molestiae enim facilis amet incidunt itaque ex quibusdam nostrum suscipit, dolores voluptatem assumenda nulla velit iste distinctio veritatis. Tempora ab repellat saepe eius nobis temporibus eos assumenda commodi fugiat! Eum blanditiis quia libero itaque facere dignissimos a et, modi corrupti harum voluptatem dolores vero nam in ipsam amet qui dolore suscipit odio cupiditate. Magni repellat earum aut dolores saepe velit deleniti omnis blanditiis dolorum aliquam ad tenetur tempora fuga illo, placeat dolor similique qui explicabo ratione, nihil corporis dicta! Doloremque accusantium facere explicabo repellat beatae tempore quasi nisi saepe quaerat animi blanditiis deserunt quas qui consequatur aliquam officiis fuga iste, provident vero error ut cum aspernatur excepturi iusto? Ipsum officia necessitatibus nisi nulla commodi, dolorum molestiae ad dolore ducimus alias doloribus. In veniam cupiditate eveniet eaque perferendis doloremque hic! Dolorem quibusdam eveniet, assumenda repellat non eius ducimus cumque aliquam sapiente repudiandae tenetur molestiae dolores quasi ut omnis? Fugit, totam. Consequatur, at deleniti iste obcaecati, quia accusamus odit odio cum voluptas nemo voluptatum nulla asperiores facilis repudiandae, consectetur fugit aliquam temporibus. Dolor eos vitae a labore.
      </div>
    </template>
    <template v-else>
      <div v-bind:class="item2" data-aos="fade-down">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio officiis ratione necessitatibus dolores reiciendis, hic blanditiis vero dolor eveniet, error, libero maxime! Ad veritatis, libero nihil fuga ratione unde culpa explicabo suscipit temporibus veniam corporis ex amet consectetur cupiditate. Impedit deserunt maxime ex facilis fugiat eveniet omnis. Quae, alias, excepturi quis quisquam assumenda dolor mollitia omnis numquam accusantium est facere veritatis consequatur aliquid deleniti aperiam adipisci repudiandae rem enim, soluta cum labore veniam. Possimus expedita id commodi fuga provident vero obcaecati, totam sequi aliquid impedit facilis debitis officiis cupiditate quod. Mollitia nesciunt adipisci vel consectetur cumque blanditiis enim vitae commodi reiciendis ducimus expedita dolorum officiis hic consequuntur, distinctio, placeat minima debitis? Eius praesentium laborum qui harum possimus quis reiciendis cumque voluptatem, molestias, repellat aperiam! Facere ducimus fugiat, nobis nulla animi harum dolores esse ratione sint ipsum expedita eaque? Commodi eos hic repellendus rem modi laborum adipisci, cum fugit qui repudiandae!
      </div>
      <div v-bind:class="item1">
        <img src="https://via.placeholder.com/450" data-aos="fade-up">
      </div>
    </template>
  </div>
  <button v-show="moveTop" @click="scrollTop()" class="mytopBtn" title="Go to top">
    <fa icon="angle-double-up" class="fa-2x" />
  </button>
</template>

<style lang="scss">
  .item1 {
    width: 30%;
    padding: 50px;
  }
  
  .item2 {
    width: 70%;
    padding: 50px;
  }
</style>

<script>
  import { ref } from 'vue'
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  import SwiperSlider from '../components/SwiperSlider.vue'

  export default {
    components: {
      SwiperSlider
    },
    data () {
      return {
        moveTop: false,
        slideIndex: 1
      }
    },
    created(){
      AOS.init();
      window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
      // this.$nextTick(this.showSlides(this.slideIndex));
    },
    methods: {
      handleScroll(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          this.moveTop = true;
        } else {
         this.moveTop = false;
        }
      },
      scrollTop(){
        window.scrollTo(0,0);
      },
      onSwiper(swiper) {
        console.log(swiper);
      },
      onSlideChange() {
        console.log('slide change');
      },
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
