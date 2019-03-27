import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import { config } from '../firebase.config'

Vue.config.productionTip = false

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('fetchAuthUser')
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    if (store.state.userId) {
      this.$store.dispatch('fetchUser', { id: store.state.userId  })
    }
  }
}).$mount('#app')
