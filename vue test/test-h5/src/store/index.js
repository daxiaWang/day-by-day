import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import vehicleDispatch from './modules/vehicleDispatch'
import user from './modules/user'
import cancleToken from './modules/cancleToken'
import setKeepAlive from './modules/setKeepAlive'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // vehicleDispatch,
    user,
    cancleToken,
    setKeepAlive
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          user: val.user,
          // vehicleDispatch: val.vehicleDispatch,
          setKeepAlive: val.setKeepAlive
        }
      }
    })
  ]
})
