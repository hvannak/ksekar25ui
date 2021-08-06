import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  categoryList: [],
  categoryProps:[],
  categorymessage:'',
  categoryTotalDoc: 0
};

const getters = {
  getcategoryProps: state => state.categoryProps,
  getcategoryList: state => state.categoryList,
  getcategoryTotalDoc: state => state.categoryTotalDoc
};

const actions = {
    async getcategoryList({ commit },pageObj) {
        try {
          const response = await axios.post(
            `${apihelper.api_url}/category/page`,pageObj,apihelper.setToken());
            commit('updatecategoryList',response.data.objList);
            commit('updatecategoryDoc',response.data.totalDoc);
        } catch (err) {
          commit('updatecategorymessage',err.response.data);
        }
      },

  async getcategoryProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/category/props`);
        commit('updatecategoryProps',response.data);
    } catch (err) {
      commit('updatecategorymessage',err.response.data);
    }
  },

  async postCategory({ commit },categoryObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/category/post`,categoryObj,apihelper.setToken());
        commit('newCategory', response.data.obj);
        commit('updatecategorymessage',response.data.message);
    } catch (err) {
      commit('updatecategorymessage',err.response.data);
    }
  },

  async deleteCategory({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/category/delete/${_id}`,apihelper.setToken());
      commit('removeCategory', _id);
    } catch (err) {
      commit('updatecategorymessage',err.response.data);
    }
  },

  async putCategory({ commit }, categoryObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/category/put/${categoryObj._id}`,categoryObj,apihelper.setToken());
        commit('updateCategory', response.data.obj);
        commit('updatecategorymessage',response.data.message);
    } catch (err) {
        commit('updatecategorymessage',err.response.data);
    }
  }

};

const mutations = {
    updatecategorymessage:(state,message) => (state.categorymessage = message),
    updatecategoryProps:(state,props) => (state.categoryProps = props),
    updatecategoryList:(state,list) => (state.categoryList = list),
    updatecategoryDoc:(state,doc) => (state.categoryTotalDoc = doc),
    newCategory: (state, cat) => state.categoryList.unshift(cat),
    removeCategory: (state, _id) =>
        (state.categoryList = state.categoryList.filter(c => c._id !== _id)),
    updateCategory: (state, catObj) => {
        const index = state.categoryList.findIndex(c => c._id === catObj._id);
        if (index !== -1) {
          state.categoryList.splice(index, 1, catObj);
        }
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};