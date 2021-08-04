import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  languageList: [],
  languageProps:[],
  Languagemessage:'',
  languageTotalDoc: 0
};

const getters = {
  getLanguageProps: state => state.languageProps,
  getLanguageList: state => state.languageList,
  getlanguageTotalDoc: state => state.languageTotalDoc
};

const actions = {
    async getLanguageList({ commit },pageObj) {
        try {
          const response = await axios.post(
            `${apihelper.api_url}/language/page`,pageObj,apihelper.setToken());
            commit('updateLanguageList',response.data.objList);
            commit('updateLanguageDoc',response.data.totalDoc);
        } catch (err) {
          commit('updateLanguageMessage',err.response.data);
        }
      },

  async getLanguageProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/language/props`);
        commit('updateLanguageProps',response.data);
    } catch (err) {
      commit('updateLanguageMessage',err.response.data);
    }
  },

  async postLanguage({ commit },languageObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/language/post`,languageObj,apihelper.setToken());
        commit('newLanguage', response.data.obj);
        commit('updateLanguageMessage',response.data.message);
    } catch (err) {
      commit('updateLanguageMessage',err.response.data);
    }
  },

  async deleteLanguage({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/language/delete/${_id}`,apihelper.setToken());
      commit('removeLanguage', _id);
    } catch (err) {
      commit('updateLanguageMessage',err.response.data);
    }
  },

  async putLanguage({ commit }, langObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/language/put/${langObj._id}`,langObj,apihelper.setToken());
        commit('updateLanguage', response.data.obj);
        commit('updateLanguageMessage',response.data.message);
    } catch (err) {
        commit('updateLanguageMessage',err.response.data);
    }
  }

};

const mutations = {
    updateLanguageMessage:(state,message) => (state.Languagemessage = message),
    updateLanguageProps:(state,props) => (state.languageProps = props),
    updateLanguageList:(state,list) => (state.languageList = list),
    updateLanguageDoc:(state,doc) => (state.languageTotalDoc = doc),
    newLanguage: (state, lang) => state.languageList.unshift(lang),
    removeLanguage: (state, _id) =>
        (state.languageList = state.languageList.filter(lang => lang._id !== _id)),
    updateLanguage: (state, langObj) => {
        const index = state.languageList.findIndex(lang => lang._id === langObj._id);
        if (index !== -1) {
          state.languageList.splice(index, 1, langObj);
        }
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};