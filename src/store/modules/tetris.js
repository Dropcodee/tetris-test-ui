import TetrisService from '@/services/tetris.service'
import UserService from '@/services/user.service'

const state = () => ({
  tetris: []
})

const getters = {
  GetTetrisRepos: (state) => state.tetris
}

const mutations = {
  SET_TETRIS_REPOS_STATE: (state, repos) => {
    // debugger
    const mergedData = [...repos, ...state.tetris]
    state.tetris = mergedData
  }
}

const actions = {
  FetchTetrisRepos: async (context, payload) => {
    try {
      const { data } = await TetrisService.tetris('github', payload)
      const formattedData = []
      data.items.forEach(repo => {
        const newRepo = {
          id: repo.id,
          name: repo.name,
          login: repo.owner.login,
          size: repo.size,
          avatar_url: repo.owner.avatar_url,
          repo_url: repo.owner.repos_url,
          description: repo.description,
          favorite: false
        }
        formattedData.push(newRepo)
      })
      context.commit('SET_TETRIS_REPOS_STATE', formattedData)
      return formattedData
    } catch (error) {
      return error
    }
  },
  SetFavoriteRepo: async (context, payload) => {
    try {
      await UserService.favorite('server', payload)
      return 1
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
