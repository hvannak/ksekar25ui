import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  postList: [],
  fetchpostList:[],
  postProps:[],
  postmessage:'',
  postTotalDoc: 0,
  postWaiting: false
};

const getters = {
  getpostProps: state => state.postProps,
  getpostList: state => state.postList,
  fetchpostList: state => state.fetchpostList,
  getpostTotalDoc: state => state.postTotalDoc,
  getpostWaiting: state => state.postWaiting
};

const actions = {
    async fetchpostList({ commit },pageObj) {
        try {
          commit('updatewaiting',true);
          const response = await axios.post(
            `${apihelper.api_url}/post/fetch`,pageObj,apihelper.setToken());
            commit('updatefetchpostList',response.data.objList);
            commit('updatepostDoc',response.data.totalDoc);
            commit('updatewaiting',false);
        } catch (err) {
          commit('updatepostmessage',err.response.data);
        }
      },

    async getpostList({ commit },pageObj) {
        try {
          commit('updatewaiting',true);
          const response = await axios.post(
            `${apihelper.api_url}/post/page`,pageObj,apihelper.setToken());
            commit('updatepostList',response.data.objList);
            commit('updatepostDoc',response.data.totalDoc);
            commit('updatewaiting',false);
        } catch (err) {
          commit('updatepostmessage',err.response.data);
        }
      },

  async getpostProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/post/props`);
        commit('updatepostProps',response.data);
    } catch (err) {
      commit('updatepostmessage',err.response.data);
    }
  },

  async postPost({ commit },postObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/post/post`,postObj,apihelper.setToken());
        commit('newPost', response.data.obj);
        commit('updatepostmessage',response.data.message);
    } catch (err) {
      commit('updatepostmessage',err.response.data);
    }
  },

  async deletePost({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/post/delete/${_id}`,apihelper.setToken());
      commit('removePost', _id);
    } catch (err) {
      commit('updatepostmessage',err.response.data);
    }
  },

  async putPost({ commit }, postObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/post/put/${postObj._id}`,postObj,apihelper.setToken());
        commit('updatePost', response.data.obj);
        commit('updatepostmessage',response.data.message);
    } catch (err) {
        commit('updatepostmessage',err.response.data);
    }
  }

};

const mutations = {
    updatepostmessage:(state,message) => (state.postmessage = message),
    updatepostProps:(state,props) => (state.postProps = props),
    updatepostList:(state,list) => (state.postList = list),
    updatepostDoc:(state,doc) => (state.postTotalDoc = doc),
    updatefetchpostList:(state,list) => {
      list.forEach(element => {
        state.fetchpostList.push(element);
      });
    },
    newPost: (state, cat) => state.postList.unshift(cat),
    removePost: (state, _id) =>
        (state.postList = state.postList.filter(c => c._id !== _id)),
    updatePost: (state, catObj) => {
        const index = state.postList.findIndex(c => c._id === catObj._id);
        if (index !== -1) {
          state.postList.splice(index, 1, catObj);
        }
    },
    updatewaiting: (state,val) => state.postWaiting = val
};

export default {
  state,
  getters,
  actions,
  mutations
};