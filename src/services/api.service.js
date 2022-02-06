import axios from 'axios'
// import store from "@/store";
export default (apiType) => {
  const ApiMotherShip = axios.create({
    baseURL: apiType === 'github' ? process.env.VUE_APP_GIT_API : process.env.VUE_APP_SERVER_API
  })
  return ApiMotherShip
}
