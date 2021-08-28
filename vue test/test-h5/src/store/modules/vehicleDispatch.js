const state = {
  vehicItemData: {},
  tabActive: 0
}
const mutations = {
  saveVehicleItemData(state, info) {
    state.vehicItemData = info
  },
  setTabActive(state, info) {
    state.tabActive = info
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
