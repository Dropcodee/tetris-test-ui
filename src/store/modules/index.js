import camelCase from 'lodash/camelCase'

const requireModule = require.context('.', false, /\.js$/)
// creates a modules object that will take in all the modules within this folder
// all will be added here to be exported within the main index.js
const modules = {}

// here we are searching through all files and adding them to the modules object
// also i'm converting the filename into a camelCase format before adding to the object.
requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') return
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
  modules[moduleName] = requireModule(fileName).default
})

// exports all the combined modules object for use in the main vuex store.
// this helps so i dont have to always import modules directly into the main store file.
export default modules
