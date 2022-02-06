import ApiMotherShip from './api.service'

export default {
  tetris (apiType, payload) {
    return ApiMotherShip(apiType).get(`search/repositories?q=${payload.query}&per_page=${payload.limit}&page=${payload.page}`)
  }
}
