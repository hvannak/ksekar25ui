import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  currencyList: [],
  currencyProps:[],
  currencymessage:'',
  currencyTotalDoc: 0
};

const getters = {
  getcurrencyProps: state => state.currencyProps,
  getcurrencyList: state => state.currencyList,
  getcurrencyTotalDoc: state => state.currencyTotalDoc
};

const actions = {
  async getcurrencyAll({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/currency/all`);
        commit('updatecurrencyList',response.data);
    } catch (err) {
      commit('updatecurrencyMessage',err.response.data);
    }
  },

    async getcurrencyList({ commit },pageObj) {
        try {
          const response = await axios.post(
            `${apihelper.api_url}/currency/page`,pageObj,apihelper.setToken());
            commit('updatecurrencyList',response.data.objList);
            commit('updatecurrencyDoc',response.data.totalDoc);
        } catch (err) {
          commit('updatecurrencyMessage',err.response.data);
        }
      },

  async getcurrencyProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/currency/props`);
        commit('updatecurrencyProps',response.data);
    } catch (err) {
      commit('updatecurrencyMessage',err.response.data);
    }
  },

  async postCurrency({ commit },currencyObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/currency/post`,currencyObj,apihelper.setToken());
        commit('newCurrency', response.data.obj);
        commit('updatecurrencyMessage',response.data.message);
    } catch (err) {
      commit('updatecurrencyMessage',err.response.data);
    }
  },

  async deleteCurrency({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/currency/delete/${_id}`,apihelper.setToken());
      commit('removeCurrency', _id);
    } catch (err) {
      commit('updatecurrencyMessage',err.response.data);
    }
  },

  async putCurrency({ commit }, currencyObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/currency/put/${currencyObj._id}`,currencyObj,apihelper.setToken());
        commit('updateCurrency', response.data.obj);
        commit('updatecurrencyMessage',response.data.message);
    } catch (err) {
        commit('updatecurrencyMessage',err.response.data);
    }
  }

};

const mutations = {
    updatecurrencyMessage:(state,message) => (state.currencymessage = message),
    updatecurrencyProps:(state,props) => (state.currencyProps = props),
    updatecurrencyList:(state,list) => (state.currencyList = list),
    updatecurrencyDoc:(state,doc) => (state.currencyTotalDoc = doc),
    newCurrency: (state, lang) => state.currencyList.unshift(lang),
    removeCurrency: (state, _id) =>
        (state.currencyList = state.currencyList.filter(c => c._id !== _id)),
    updateCurrency: (state, currencyObj) => {
        const index = state.currencyList.findIndex(lang => lang._id === currencyObj._id);
        if (index !== -1) {
          state.currencyList.splice(index, 1, currencyObj);
        }
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};