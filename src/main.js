import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_BACKEND_URL,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
    },
  })
)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
