const state = {
  userInfo: {},
};

const mutations = {
  saveUserInfo(state, info) {
    state.userInfo = info;
  },
  removeUserInfo(state) {
    state.userInfo = {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
