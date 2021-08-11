import axios from 'axios';
import * as apihelper from './api-helper';

const state = {
  notificationList: [],
  notificationProps:[],
  notificationmessage:'',
  notificationTotalDoc: 0
};

const getters = {
  getnotificationProps: state => state.notificationProps,
  getnotificationList: state => state.notificationList,
  getnotificationTotalDoc: state => state.notificationTotalDoc
};

const actions = {
  async getnotificationSearchList({ commit },pageObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/notification/search`,pageObj);
        commit('updatenotificationList',response.data.objList);
        commit('updatenotificationDoc',response.data.totalDoc);
    } catch (err) {
      commit('updatenotificationmessage',err.response.data);
    }
  },

    async getnotificationList({ commit },pageObj) {
        try {
          const response = await axios.post(
            `${apihelper.api_url}/notification/page`,pageObj,apihelper.setToken());
            commit('updatenotificationList',response.data.objList);
            commit('updatenotificationDoc',response.data.totalDoc);
        } catch (err) {
          commit('updatenotificationmessage',err.response.data);
        }
      },

  async getnotificationProps({ commit }) {
    try {
      const response = await axios.get(
        `${apihelper.api_url}/notification/props`);
        commit('updatenotificationProps',response.data);
    } catch (err) {
      commit('updatenotificationmessage',err.response.data);
    }
  },

  async postNotification({ commit },notificationObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/notification/post`,notificationObj,apihelper.setToken());
        commit('newNotification', response.data.obj);
        commit('updatenotificationmessage',response.data.message);
    } catch (err) {
      commit('updatenotificationmessage',err.response.data);
    }
  },

  async deleteNotification({ commit }, _id) {
    try {
      await axios.delete(`${apihelper.api_url}/notification/delete/${_id}`,apihelper.setToken());
      commit('removeNotification', _id);
    } catch (err) {
      commit('updatenotificationmessage',err.response.data);
    }
  },

  async putNotification({ commit }, notificationObj) {
    try {
        const response = await axios.put(
        `${apihelper.api_url}/notification/put/${notificationObj._id}`,notificationObj,apihelper.setToken());
        commit('updateNotification', response.data.obj);
        commit('updatenotificationmessage',response.data.message);
    } catch (err) {
        commit('updatenotificationmessage',err.response.data);
    }
  }

};

const mutations = {
    updatenotificationmessage:(state,message) => (state.notificationmessage = message),
    updatenotificationProps:(state,props) => (state.notificationProps = props),
    updatenotificationList:(state,list) => (state.notificationList = list),
    updatenotificationDoc:(state,doc) => (state.notificationTotalDoc = doc),
    newNotification: (state, cat) => state.notificationList.unshift(cat),
    removeNotification: (state, _id) =>
        (state.notificationList = state.notificationList.filter(c => c._id !== _id)),
    updateNotification: (state, catObj) => {
        const index = state.notificationList.findIndex(c => c._id === catObj._id);
        if (index !== -1) {
          state.notificationList.splice(index, 1, catObj);
        }
    }
};

export default {
  state,
  getters,
  actions,
  mutations
};