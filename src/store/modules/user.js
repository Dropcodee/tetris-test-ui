import UserService from '@/services/user.service'

const state = () => ({
  userInfo: {}
})

const getters = {
  GetUserInfo: (state) => state.userInfo
}

const mutations = {
  SET_USER_INFO_STATE: (state, info) => {
    state.userInfo = info
  }
}

const actions = {
  FetchCurrentUserInfo: async (context) => {
    try {
      const { data } = await UserService.userData('ip')
      console.log('user data => ', data)
    } catch (error) {
      return error
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
