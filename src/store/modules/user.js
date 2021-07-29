import axios from 'axios';
import * as apihelper from './api-helper';
import  router from '../../router';

const state = {
  users: [],
  user:{},
  message:''
};

const getters = {
  getUser: state => state.user
};

const actions = {
  async loginUser({ commit }, userObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/auth/login`,userObj);
        localStorage.setItem('token',response.data);
        router.push({ name: 'ControlPanel'});
    } catch (err) {
      commit('updateMessage',err.response.data);
    }
  },

};

const mutations = {
  updateMessage:(state,message) => (state.message = message),
};

export default {
  state,
  getters,
  actions,
  mutations
};