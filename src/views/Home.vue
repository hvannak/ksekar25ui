<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 px-0 my-1">
        <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <template v-for="item in 10" :key="item" >
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
    <template v-for="(item,index) in postList" :key="index">
      <div v-if="index%2" class="col-12" data-aos="fade-up">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4">
              <div class="img">
              <img
                  :src="`${readBufferImg(item.image)}`"
                  class="card-img-top img-fluid"
                  alt="..."
                />
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">{{item.description}}</p>
                <p class="card-text"><small class="text-muted">Last updated
                      {{ item.date.substring(0,10) }}</small></p>
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
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">{{item.description}}</p>
                <p class="card-text"><small class="text-muted">Last updated
                      {{ item.date.substring(0,10) }}</small></p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="d-flex justify-content-end">
                <div class="img">
                <img
                  :src="`${readBufferImg(item.image)}`"
                  class="card-img-top img-fluid"
                  alt="..."
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <div v-if="postWaiting" class="d-flex justify-content-center my-5">
    <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
import { reactive, computed } from "vue";
import useRepositories from "../utility/uirepositories";
import {readBufferImg} from "../utility/helper";

export default {
  setup() {    
    let postObj = reactive({
      pageSize: 2,
      page: 1
    });
    const { store, findData } = useRepositories(
      { action: "fetchpostList", param: postObj },
      []
    );
    const handleScroll = (event) => {
      // console.log('top' + event.target.scrollingElement.scrollTop);
      // console.log('topmax' + event.target.scrollingElement.scrollTopMax);
      if(event.target.scrollingElement.scrollTop == event.target.scrollingElement.scrollTopMax){
        console.log('you have to load more');
        if(postObj.page < store.getters.getpostTotalDoc){
          console.log('you in')
          postObj.page = postObj.page + 1;
          findData('fetchpostList',postObj);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return {
      postList: computed(() => store.getters.fetchpostList),
      postDoc: computed(() => store.getters.getpostTotalDoc),
      postWaiting: computed(() => store.getters.getpostWaiting),
      postObj,
      readBufferImg,
      handleScroll
    };
  },
};
</script>
<style>
  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    max-height: 450px;
    overflow: hidden;
  }
</style>
