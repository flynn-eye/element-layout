import Vue from 'vue'
import Vuex from 'vuex'
import commonStore from './commonStore'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    commonStore
  }
})
