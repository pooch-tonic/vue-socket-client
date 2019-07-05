import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    motd: 'Apata ganda baa',
  },
  mutations: {
    editMotd(state, newMotd) {
      state.motd = newMotd.toString()
    },
  },
  actions: {
    SOCKET_EDIT_MOTD(context, newMotd) {
      console.log(newMotd)
      context.commit('editMotd', newMotd)
    },
  },
})
