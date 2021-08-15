import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  presentationList: [],
  presentationProps:[],
  presentationmessage:'',
  presentationTotalDoc: 0,
  presentationWaiting: false
};

const getters = {
  getpresentationProps: state => state.presentationProps,
  getpresentationList: state => state.presentationList,
  getpresentationTotalDoc: state => state.presentationTotalDoc,
  getpresentationWaiting: state => state.presentationWaiting
};

const actions = {
  async getpresentationAll({ commit },objData) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/presentation/all`,objData);
        console.log(response.data);
        commit('updatepresentationList',response.data);
    } catch (err) {
      commit('updatepresentationmessage',err.response.data);
    }
  },

    async getpresentationList({ commit },pageObj) {
        try {
          console.log(pageObj);
          commit('updatewaiting',true);
          const response = await axios.post(
            `${apihelper.api_url}/presentation/page`,pageObj,apihelper.setToken());
            commit('updatepresentationList',response.data.objList);
            commit('updatepresentationDoc',response.data.totalDoc);
            commit('updatewaiting',false);
        } catch (err) {
          commit('updatepresentationmessage',err.response.data);
        }
      },

  async getpresentationProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/presentation/props`);
        commit('updatepresentationProps',response.data);
    } catch (err) {
      commit('updatepresentationmessage',err.response.data);
    }
  },

  async postPresentation({ commit },presentationObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/presentation/post`,presentationObj,apihelper.setToken());
        commit('newPresentation', response.data.obj);
        commit('updatepresentationmessage',response.data.message);
    } catch (err) {
      commit('updatepresentationmessage',err.response.data);
    }
  },

  async deletePresentation({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/presentation/delete/${_id}`,apihelper.setToken());
      commit('removePresentation', _id);
    } catch (err) {
      commit('updatepresentationmessage',err.response.data);
    }
  },

  async putPresentation({ commit }, presentationObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/presentation/put/${presentationObj._id}`,presentationObj,apihelper.setToken());
        commit('updatePresentation', response.data.obj);
        commit('updatepresentationmessage',response.data.message);
    } catch (err) {
        commit('updatepresentationmessage',err.response.data);
    }
  }

};

const mutations = {
    updatepresentationmessage:(state,message) => (state.presentationmessage = message),
    updatepresentationProps:(state,props) => (state.presentationProps = props),
    updatepresentationList:(state,list) => (state.presentationList = list),
    updatepresentationDoc:(state,doc) => (state.presentationTotalDoc = doc),
    newPresentation: (state, obj) => state.presentationList.unshift(obj),
    removePresentation: (state, _id) =>
        (state.presentationList = state.presentationList.filter(c => c._id !== _id)),
    updatePresentation: (state, obj) => {
        const index = state.presentationList.findIndex(c => c._id === obj._id);
        if (index !== -1) {
          state.presentationList.splice(index, 1, obj);
        }
    },
    updatewaiting: (state,val) => state.presentationWaiting = val
};

export default {
  state,
  getters,
  actions,
  mutations
};