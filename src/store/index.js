import { createStore } from "vuex";

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("currentUser")),
    currentDate : new Date().toJSON().slice(0,10)
  },
  getters: {
    user: state => state.user,
    getCurrentDate: state => state.currentDate
  },
  mutations: {
    ["UPDATE_USER"](state, user) {
      state.user = user;
    }
  },
  actions: {
    updateUser({ commit }, user) {
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
      commit("UPDATE_USER", user);
    }
  },
  modules: {}
});
