const state = {
  token: '',
  userInfo: {},
  applyUrls: '',
  navHeight: 0
}
const mutations = {
  saveToken(state, info) {
    state.token = info
  },
  saveUserInfo(state, info) {
    state.userInfo = info
  },
  removeUserInfo(state) {
    state.userInfo = ''
  },
  resetLogin(state) {
    state.userInfo = ''
    state.token = ''
    window.sessionStorage.setItem('userInfo', '')
  },
  applyUrls(state, info) {
    state.applyUrls = info
  },
  navHeight(state, height) {
    state.navHeight = height
  }
}
export default {
  namespaced: true,
  state,
  mutations
}
