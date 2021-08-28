const cancleToken = {
  state: {
    cancelTokenArr: []
  },
  mutations: {
    pushToken(state, payload) {
      state.cancelTokenArr.push(payload.cancelToken)
    },
    clearToken(state) {
      state.cancelTokenArr.forEach(item => {
        item('取消请求')
      })
      state.cancelTokenArr = []
    }
  }
}
export default cancleToken
