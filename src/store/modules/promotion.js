import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  promotionList: [],
  promotionProps:[],
  promotionmessage:'',
  promotionTotalDoc: 0,
  promotionWaiting: false
};

const getters = {
  getpromotionProps: state => state.promotionProps,
  getpromotionList: state => state.promotionList,
  getpromotionTotalDoc: state => state.promotionTotalDoc,
  getpromotionWaiting: state => state.promotionWaiting
};

const actions = {
  async getpromotionAll({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/promotion/all`);
        console.log(response.data);
        commit('updatepromotionList',response.data);
    } catch (err) {
      commit('updatepromotionmessage',err.response.data);
    }
  },

    async getpromotionList({ commit },pageObj) {
        try {
          console.log(pageObj);
          commit('updatewaiting',true);
          const response = await axios.post(
            `${apihelper.api_url}/promotion/page`,pageObj,apihelper.setToken());
            commit('updatepromotionList',response.data.objList);
            commit('updatepromotionDoc',response.data.totalDoc);
            commit('updatewaiting',false);
        } catch (err) {
          commit('updatepromotionmessage',err.response.data);
        }
      },

  async getpromotionProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/promotion/props`);
        commit('updatepromotionProps',response.data);
    } catch (err) {
      commit('updatepromotionmessage',err.response.data);
    }
  },

  async postPromotion({ commit },promotionObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/promotion/post`,promotionObj,apihelper.setToken());
        commit('newPromotion', response.data.obj);
        commit('updatepromotionmessage',response.data.message);
    } catch (err) {
      commit('updatepromotionmessage',err.response.data);
    }
  },

  async deletePromotion({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/promotion/delete/${_id}`,apihelper.setToken());
      commit('removePromotion', _id);
    } catch (err) {
      commit('updatepromotionmessage',err.response.data);
    }
  },

  async putPromotion({ commit }, promotionObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/promotion/put/${promotionObj._id}`,promotionObj,apihelper.setToken());
        commit('updatePromotion', response.data.obj);
        commit('updatepromotionmessage',response.data.message);
    } catch (err) {
        commit('updatepromotionmessage',err.response.data);
    }
  }

};

const mutations = {
    updatepromotionmessage:(state,message) => (state.promotionmessage = message),
    updatepromotionProps:(state,props) => (state.promotionProps = props),
    updatepromotionList:(state,list) => (state.promotionList = list),
    updatepromotionDoc:(state,doc) => (state.promotionTotalDoc = doc),
    newPromotion: (state, obj) => state.promotionList.unshift(obj),
    removePromotion: (state, _id) =>
        (state.promotionList = state.promotionList.filter(c => c._id !== _id)),
    updatePromotion: (state, obj) => {
        const index = state.promotionList.findIndex(c => c._id === obj._id);
        if (index !== -1) {
          state.promotionList.splice(index, 1, obj);
        }
    },
    updatewaiting: (state,val) => state.promotionWaiting = val
};

export default {
  state,
  getters,
  actions,
  mutations
};