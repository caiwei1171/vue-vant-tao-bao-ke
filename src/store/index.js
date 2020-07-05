import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import home from "./modules/home.js"
import category from "./modules/category.js"
import good from "./modules/good.js"
import footprint from "./modules/footprint.js"
import search from "./modules/search.js"
export default new Vuex.Store({
  modules:{
    home,
    category,
    good,
    footprint,
    search
  },
  state:{
    id:92014
  }
})
