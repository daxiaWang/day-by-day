// import { login, logout, getInfo } from '@/api/user'
import { login, getInfo, industryType } from '@/api/product'
import { getToken, setToken, removeToken, getHeaderName, setHeaderName, setStorage, getStorage } from '@/utils/auth'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  tokenName: getStorage('tokenName'),
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_TOKEN_NAME: (state, name) => {
    state.tokenName = name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        if (response.code === 0) {
          console.log('login', response)
          const { data } = response
          commit('SET_TOKEN', data.token)

          commit('SET_TOKEN_NAME', data.headerName)

          setStorage('tokenName', data.headerName)
          setStorage('token', data.token)

          setToken(data.token)
          resolve()
        } else {
          Message({
            message: response.message,
            showClose: true,
            type: 'error',
            duration: 5 * 1000
          })
          reject()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  industryType() {
    // industryType
    return new Promise((resolve, reject) => {
      industryType().then(response => {
        if (response.code === 0) {
          const { data } = response

          if (!data) {
            reject(response.message)
          }
          const aa = Object.values(data)
          resolve({ data: aa })
        } else {
          Message({
            message: response.message,
            showClose: true,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        if (response.code === 0) {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          // const { roles, name, avatar, introduction } = data
          const rolesArr = data.split(',')

          // roles must be a non-empty array
          if (!rolesArr || rolesArr.length <= 0) {
            reject('getInfo: roles must be a non-null array!')
          }

          commit('SET_ROLES', rolesArr)
          // commit('SET_NAME', name)
          // commit('SET_AVATAR', avatar)
          // commit('SET_INTRODUCTION', introduction)
          resolve({ roles: rolesArr })
        } else {
          Message({
            message: response.message,
            showClose: true,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      setStorage('tokenName', '')
      setStorage('token', '')

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      // dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //     reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
