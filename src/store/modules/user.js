import axios from "axios";
import * as apihelper from "./api-helper";
import router from "../../router";

const state = {
  userList: [],
  userProps: [],
  usermessage: "",
  userTotalDoc: 0,
};

const getters = {
  getuserProps: (state) => state.userProps,
  getuserList: (state) => state.userList,
  getuserTotalDoc: (state) => state.userTotalDoc,
};

const actions = {
  async loginUser({ commit }, userObj) {
    try {
      console.log(userObj);
      const response = await axios.post(
        `${apihelper.api_url}/auth/login`,
        userObj
      );
      localStorage.setItem("token", response.data);
      router.push({ name: "ControlPanel" });
    } catch (err) {
      commit("updateuserMessage", err.response.data);
    }
  },

  async getuserList({ commit }, pageObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/auth/page`,
        pageObj,
        apihelper.setToken()
      );
      commit("updateuserList", response.data.objList);
      commit("updateuserDoc", response.data.totalDoc);
    } catch (err) {
      commit("updateusermessage", err.response.data);
    }
  },

  async getuserProps({ commit }) {
    try {
      const response = await axios.get(`${apihelper.api_url}/auth/props`);
      commit("updateuserProps", response.data);
    } catch (err) {
      commit("updateusermessage", err.response.data);
    }
  },

  async postUser({ commit }, userObj) {
    try {
      const response = await axios.post(
        `${apihelper.api_url}/auth/post`,
        userObj,
        apihelper.setToken()
      );
      commit("newUser", response.data.obj);
      commit("updateusermessage", response.data.message);
    } catch (err) {
      commit("updateusermessage", err.response.data);
    }
  },

  async deleteUser({ commit }, _id) {
    try {
      await axios.delete(
        `${apihelper.api_url}/auth/delete/${_id}`,
        apihelper.setToken()
      );
      commit("removeUser", _id);
    } catch (err) {
      commit("updateusermessage", err.response.data);
    }
  },

  async putUser({ commit }, userObj) {
    try {
      const response = await axios.put(
        `${apihelper.api_url}/auth/put/${userObj._id}`,
        userObj,
        apihelper.setToken()
      );
      commit("updateUser", response.data.obj);
      commit("updateusermessage", response.data.message);
    } catch (err) {
      commit("updateusermessage", err.response.data);
    }
  },
};

const mutations = {
  updateusermessage: (state, message) => (state.usermessage = message),
  updateuserProps:(state,props) => (state.userProps = props),
  updateuserList:(state,list) => (state.userList = list),
  updateuserDoc:(state,doc) => (state.userTotalDoc = doc),
  newUser: (state, user) => state.userList.unshift(user),
  removeUser: (state, _id) =>
      (state.userList = state.userList.filter(u => u._id !== _id)),
  updateUser: (state, userObj) => {
      const index = state.userList.findIndex(lang => lang._id === userObj._id);
      if (index !== -1) {
        state.userList.splice(index, 1, userObj);
      }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
