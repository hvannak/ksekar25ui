import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  productList: [],
  productProps:[],
  productmessage:'',
  productTotalDoc: 0
};

const getters = {
  getproductProps: state => state.productProps,
  getproductList: state => state.productList,
  getproductTotalDoc: state => state.productTotalDoc
};

const actions = {
    async getproductList({ commit },pageObj) {
        try {
          const response = await axios.post(
            `${apihelper.api_url}/product/page`,pageObj,apihelper.setToken());
            commit('updateproductList',response.data.objList);
            commit('updateproductDoc',response.data.totalDoc);
        } catch (err) {
          commit('updateproductmessage',err.response.data);
        }
      },

  async getproductProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/product/props`);
        commit('updateproductProps',response.data);
    } catch (err) {
      commit('updateproductmessage',err.response.data);
    }
  },

  async postProduct({ commit },productObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/product/post`,productObj,apihelper.setToken());
        commit('newProduct', response.data.obj);
        commit('updateproductmessage',response.data.message);
    } catch (err) {
      commit('updateproductmessage',err.response.data);
    }
  },

  async deleteProduct({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/product/delete/${_id}`,apihelper.setToken());
      commit('removeProduct', _id);
    } catch (err) {
      commit('updateproductmessage',err.response.data);
    }
  },

  async putProduct({ commit }, productObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/product/put/${productObj._id}`,productObj,apihelper.setToken());
        commit('updateProduct', response.data.obj);
        commit('updateproductmessage',response.data.message);
    } catch (err) {
        commit('updateproductmessage',err.response.data);
    }
  }

};

const mutations = {
    updateproductmessage:(state,message) => (state.productmessage = message),
    updateproductProps:(state,props) => (state.productProps = props),
    updateproductList:(state,list) => (state.productList = list),
    updateproductDoc:(state,doc) => (state.productTotalDoc = doc),
    newProduct: (state, cat) => state.productList.unshift(cat),
    removeProduct: (state, _id) =>
        (state.productList = state.productList.filter(c => c._id !== _id)),
    updateProduct: (state, catObj) => {
        const index = state.productList.findIndex(c => c._id === catObj._id);
        if (index !== -1) {
          state.productList.splice(index, 1, catObj);
        }
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};