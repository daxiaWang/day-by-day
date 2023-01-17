const state = {
  catchList: [],
};
const mutations = {
  setKeepAlive(state, info) {
    !state.catchList.includes(info) && state.catchList.push(info);
  },
  removeKeepAlive(state, info) {
    const index = state.catchList.indexOf(info);
    index > -1 && state.catchList.splice(index, 1);
  },
};
export default {
  namespaced: true,
  state,
  mutations,
};
