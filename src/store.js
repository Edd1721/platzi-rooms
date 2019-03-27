import Vue from 'vue'
import firebase from 'firebase'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: {},
    services: {},
    users: {},
    userId: null,
    modals: {
      login: false,
      register: false
    }
  },
  getters: {
    modals: state => state.modals,
    authUser: state => {
      if (state.userId) {
        return state.users[state.userId]
      }
    },
    rooms: state => state.rooms
  },
  actions: {
    setModalState ({ commit }, { name, value }) {
      commit('SET_MODAL_STATE', { name, value })
    },
    createNewRoom ({ commit, state }, room) {
      const updates = {}
      const newRoom = room
      const roomId = firebase.database().ref('rooms').push().key

      newRoom.userId = state.userId

      updates[`rooms/${roomId}`] = newRoom
      updates[`users/${newRoom.userId}/rooms/${roomId}`] = roomId

      firebase.database().ref().update(updates)
        .then(() => {
          commit('SET_NEW_ROOM', { room: newRoom, roomId })
          commit('SET_ROOM_TO_USER', { roomId, userId: newRoom.userId })

          return Promise.resolve(state.rooms[roomId])
        })
    },
    fetchRooms ({ commit, state }, limit) {
      return new Promise(resolve => {
        let instance = firebase.database().ref('rooms')

        if (limit) {
          instance = instance.limitToFirst(limit)
        }

        instance.once('value', snapshot => {
          const rooms = snapshot.val()

          Object.keys(rooms).forEach(roomId => {
            const room = rooms[roomId]

            commit('SET_ITEM', { item: room, id: roomId, resource: 'rooms'})
          })

          resolve(Object.values(state.rooms))
        })
      })
    },
    fetchUser ({ commit, state }, { id }) {
      return new Promise(resolve => {
        firebase.database().ref('users').child(id).once('value', snap => {
          commit('SET_ITEM', { resource: 'users', id: snap.key, item: snap.val() })

          resolve(state.users[id])
        })
      })
    },
    createUser ({ commit, state }, { name, email, password }) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((account) => {
        const idUser = account.user.uid
        const registeredAt = Math.floor(Date.now() / 1000)
        const newUser = { name, email, registeredAt }

        firebase.database().ref('users').child(idUser).set(newUser)
        .then(() => {
          commit('SET_ITEM', { resource: 'users', id: idUser, item: newUser})
          resolve()
        })
      })
    },
    fetchAuthUser ({ dispatch, commit }) {
      const id = firebase.auth().currentUser.uid
      
      dispatch('fetchUser', { id })
      .then(() => commit('SET_AUTH_ID', id))
    },
    signIn (context, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signOut ({ commit }) {
      firebase.auth().signOut()
      .then(() => commit('SET_AUTH_ID', null))
    }
  },
  mutations: {
    'SET_MODAL_STATE' (state, { name, value }) {
      state.modals[name] = value
    },
    'SET_NEW_ROOM' (state, { room, roomId }) {
      Vue.set(state.rooms, roomId, room)
    },
    'SET_ROOM_TO_USER' (state, { roomId, userId }) {
      Vue.set(state.users[userId].rooms, roomId, roomId)
    },
    'SET_ITEM' (state, { item, id, resource }) {
      const newItem = item
      newItem['.key'] = id

      Vue.set(state[resource], id, newItem)
    },
    'SET_AUTH_ID' (state, value) {
      state.userId = value
    }
  }
})
