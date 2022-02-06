import ApiMotherShip from './api.service'

export default {
  userData (apiType) {
    return ApiMotherShip(apiType).get()
  },
  favorite (apiType, payload) {
    return ApiMotherShip(apiType).post('repos/favorites', payload)
  }
}
