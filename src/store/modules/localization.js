import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  localizationList: [],
  localconstList:[],
  localizationProps:[],
  localizationmessage:'',
  localizationTotalDoc: 0
};

const getters = {
  getlocalizationProps: state => state.localizationProps,
  getlocalizationList: state => state.localizationList,
  getlocalizationLocalConst: state => state.localconstList,
  getlocalizationTotalDoc: state => state.localizationTotalDoc
};

const actions = {
    async getlocalizationSwitch({ commit },lang) {
        try {
          const response = await axios.get(
            `${apihelper.api_url}/localization/switch/` + lang);
            console.log(response.data);
            commit('updatelocalizationList',response.data);
        } catch (err) {
          commit('updatelocalizationmessage',err.response.data);
        }
      },

  async getlocalizationLocalConst({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/localization/localprops`);
        commit('updatelocalconstList',response.data);
    } catch (err) {
      commit('updatelocalizationmessage',err.response.data);
    }
  },

    async getlocalizationList({ commit },pageObj) {
        try {
          const response = await axios.post(
            `${apihelper.api_url}/localization/page`,pageObj,apihelper.setToken());
            console.log(response.data.objList);
            commit('updatelocalizationList',response.data.objList);
            commit('updatelocalizationDoc',response.data.totalDoc);
        } catch (err) {
          commit('updatelocalizationmessage',err.response.data);
        }
      },

  async getlocalizationProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/localization/props`);
        commit('updatelocalizationProps',response.data);
    } catch (err) {
      commit('updatelocalizationmessage',err.response.data);
    }
  },

  async postLocalization({ commit },localizationObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/localization/post`,localizationObj,apihelper.setToken());
        commit('newLocalization', response.data.obj);
        commit('updatelocalizationmessage',response.data.message);
    } catch (err) {
      commit('updatelocalizationmessage',err.response.data);
    }
  },

  async deleteLocalization({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/localization/delete/${_id}`,apihelper.setToken());
      commit('removeLocalization', _id);
    } catch (err) {
      commit('updatelocalizationmessage',err.response.data);
    }
  },

  async putLocalization({ commit }, localizationObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/localization/put/${localizationObj._id}`,localizationObj,apihelper.setToken());
        commit('updateLocalization', response.data.obj);
        commit('updatelocalizationmessage',response.data.message);
    } catch (err) {
        commit('updatelocalizationmessage',err.response.data);
    }
  }

};

const mutations = {
    updatelocalizationmessage:(state,message) => (state.localizationmessage = message),
    updatelocalizationProps:(state,props) => (state.localizationProps = props),
    updatelocalizationList:(state,list) => (state.localizationList = list),
    updatelocalconstList:(state,list) => (state.localconstList = list),
    updatelocalizationDoc:(state,doc) => (state.localizationTotalDoc = doc),
    newLocalization: (state, cat) => state.localizationList.unshift(cat),
    removeLocalization: (state, _id) =>
        (state.localizationList = state.localizationList.filter(c => c._id !== _id)),
    updateLocalization: (state, catObj) => {
        const index = state.localizationList.findIndex(c => c._id === catObj._id);
        if (index !== -1) {
          state.localizationList.splice(index, 1, catObj);
        }
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};