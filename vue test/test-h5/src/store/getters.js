const getters = {
//   vehicItemData: state => state.vehicleDispatch.vehicItemData,
  token: state => state.user.userInfo.token,
  applyUrls: state => state.user.applyUrls,
  userInfo: state => state.user.userInfo.userInfo,
  navHeight: state => state.user.navHeight
}
export default getters
