<template>
  <header class="bg-white py-5 shadow">
    <div class="container">
      <div class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-no-shrink mr-6">
          <router-link
            :to="{ name: 'HomePage' }"
            class="text-black hover:text-grey-darkest no-underline font-semibold text-lg"
          >
            Platzi Rooms
          </router-link>
        </div>
        <div class="flex items-center w-auto">
          <div class="items__controls">
            <div class="flex" v-if="user">
              <router-link
                :to="{ name: 'CreateHousePage' }"
                tag="button"
                class="mr-2 flex items-center"
              >
                <i class="material-icons">add</i>
              </router-link>
              <button class="mr-4 flex items-center">
                <i class="material-icons">notifications</i>
              </button>
              <button class="mr-4 flex items-center" @click.prevent="logOut">
                <i class="material-icons">logout</i>
              </button>
              <div class="flex items-center">
                <img class="w-8 h-8 rounded-full mr-2" src="https://avatars2.githubusercontent.com/u/1901273?s=460&v=4" alt="Avatar of Javier Diaz">
                <div class="text-sm">
                  <p class="text-black leading-none">{{ user.name }}</p>
                  <p class="text-grey-dark">Online</p>
                </div>
              </div>
              <div class="flex pl-4">
                <button class="mr-4 flex items-center" @click.prevent="logOut">
                  <i class="material-icons">logout</i>
                </button>
              </div>
            </div>
            <div v-else>
              <button
                class="btn__outline btn__outline--teal rounded mr-2"
                @click.prevent="getLogin"
              >
                Login
              </button>
              <button
                class="bg-yellow-dark text-yellow-darker font-semibold py-2 px-4 rounded"
                @click.prevent="signUp"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderPartial',
  data () {
    return {
      isAuthenticated: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'authUser'
    })
  },
  watch: {
    user: (val) => {
      console.log('USER::', val)
    }
  },
  methods: {
    getLogin () {
      this.$store.dispatch('setModalState', { name: 'login', value: true })
    },
    signUp () {
      this.$store.dispatch('setModalState', { name: 'register', value: true })
      console.log('Sign Up Click')
    },
    logOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>
