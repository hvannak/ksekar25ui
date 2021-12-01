import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  product: {},
  productList: [],
  productProps:[],
  productmessage:'',
  productTotalDoc: 0,
  productWaiting: false
};

const getters = {
  getproduct: state => state.product,
  getproductProps: state => state.productProps,
  getproductList: state => state.productList,
  getproductTotalDoc: state => state.productTotalDoc,
  getproductWaiting: state => state.productWaiting
};

const actions = {
  async getproductSearchList({ commit },searchObj) {
    try {
      commit('updatewaiting',true);
      const response = await axios.post(
        `${apihelper.api_url}/product/search`,searchObj,apihelper.setToken());
        commit('updateproductList',response.data.objList);
        commit('updateproductDoc',response.data.totalDoc);
        commit('updatewaiting',false);
    } catch (err) {
      commit('updateproductmessage',err.response.data);
    }
  },

    async getproductList({ commit },pageObj) {
        try {
          commit('updatewaiting',true);
          const response = await axios.post(
            `${apihelper.api_url}/product/page`,pageObj,apihelper.setToken());
            commit('updateproductList',response.data.objList);
            commit('updateproductDoc',response.data.totalDoc);
            commit('updatewaiting',false);
        } catch (err) {
          commit('updateproductmessage',err.response.data);
        }
      },

      async getproductById({ commit },_id) {
        try {
          console.log(_id);
          commit('updatewaiting',true);
          const response = await axios.get(
            `${apihelper.api_url}/product/byId/${_id}`,apihelper.setToken());
            console.log(response.data);
            commit('updateproduct',response.data);
            commit('updatewaiting',false);
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
    updateproduct:(state,prop) => (state.product = prop),
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
    },
    updatewaiting: (state,val) => state.productWaiting = val
};

export default {
  state,
  getters,
  actions,
  mutations
};