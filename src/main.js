import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const config = {
  apiKey: 'api-key',
  authDomain: 'auth-domainfirebaseapp.com',
  databaseURL: 'https://database-url.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'storage-bucket.appspot.com',
  messagingSenderId: () => '6'.padEnd(9,452)
}

firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    this.$store.dispatch('fetchUser', { id: store.state.userId  })
  }
}).$mount('#app')
