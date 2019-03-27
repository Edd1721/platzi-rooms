<template>
  <div class="page-layout">
    <header-partial></header-partial>
    <main class="main">
      <slot></slot>
    </main>
    <footer-partial></footer-partial>
    <modal :show="modals.login" @close-modal="closeModal">
      <h2 class="text-gray-darkest font-semibold text-center mb-6">
        Welcome to Platzi Rooms
      </h2>

      <form>
        <div class="mb-4">
          <label class="input__label">Email</label>
          <div class="form__field relative">
            <input v-model="formLogin.email" class="input__field" type="text" placeholder="bruce.wayne@imnotbatman.io"/>
          </div>
        </div>
        <div class="mb-4">
          <label class="input__label">Password</label>
          <div class="form__field relative">
            <input v-model="formLogin.password" class="input__field" type="password" placeholder="***********"/>
          </div>
        </div>
        <div class="mb-4">
          <toggle-input v-model="formLogin.rememberMe"></toggle-input>
          Remember Me
        </div>
         <div class="mb-4">
          <button class="btn btn-primary mr-3 w-full">Login</button>
        </div>
      </form>
    </modal>
    <modal :show="modals.register" @close-modal="closeModalRegister">
      <form class="form" @submit.prevent="registerHandlerSubmit">
        <div class="mb-4">
          <label class="input__label" for="email">Email</label>
          <div class="form__field relative">
            <input
              class="input__field"
              id="email"
              v-model="formRegister.email"
              type="email"
              placeholder="bruce.wayne@imnotbatman.org">
          </div>
        </div>
        <div class="mb-4">
          <label class="input__label" for="email">Name</label>
          <div class="form__field relative">
            <input
              class="input__field"
              id="name"
              v-model="formRegister.name"
              type="text"
              placeholder="Bruce Wayne">
          </div>
        </div>
        <div class="mb-4">
          <label class="input__label" for="password">Password</label>
          <div class="form__field relative">
            <input
              class="input__field"
              id="password"
              v-model="formRegister.password"
              type="password"
              placeholder="Create a Password">
          </div>
        </div>
        <div class="mb-4">
          <button class="btn w-full">Create account</button>
        </div>
      </form>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderPartial from '@/partials/HeaderPartial.vue'
import FooterPartial from '@/partials/FooterPartial.vue'
import Modal from '@/components/Modal.vue'
import ToggleInput from '@/components/ToggleInput.vue'

export default {
  name: 'PageLayout',
  components: {
    HeaderPartial,
    FooterPartial,
    Modal,
    ToggleInput
  },
  data () {
    return {
      formLogin: {
        email: '',
        password: '',
        rememberMe: false
      },
      formRegister: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'modals'
    ])
  },
  methods: {
    closeModal () {
      this.$store.dispatch('setModalState', { name: 'login', value: false })
    },
    closeModalRegister () {
      this.$store.dispatch('setModalState', { name: 'register', value: false })
    }
  }
}
</script>

<style>
  .form__field .input-icon {
    top: 7px;
    left: 9px;
  }
</style>
