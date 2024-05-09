
export default {
  namespaced: true,
  state: {
    isHome:true,
    aNowRouterData: []
  },
  mutations: {
    SET_ROUTER_NOW_INFO(state, value) {
      state.aNowRouterData = value
    },
    SET_IS_HOME(state, value) { 
      state.isHome = value
    }
  },
  actions: {

  },
  getters: {}
}