import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import user from "./modules/user";
import setKeepAlive from "./modules/setKeepAlive";
import cancleToken from "./modules/cancleToken";
import business from "./modules/business";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    setKeepAlive,
    cancleToken,
    business,
  },
  getters,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer(val) {
        return {
          user: val.user,
          business: val.business,
        };
      },
    }),
  ],
});

export default store;
