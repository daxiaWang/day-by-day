const getters = {
  userInfo: (state) => state.user.userInfo.userInfo,
  token: (state) => state.user.userInfo.token,
  catchList: (state) => state.setKeepAlive.catchList,
  needHeader: (state) => state.business.needHeader,
};
export default getters;
