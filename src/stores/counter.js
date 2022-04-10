import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    connected : false,
    pseudo : "",
    user_image : ""
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },

    loggedIn(pseudo, user_image) {
      this.pseudo = pseudo;
      this.user_image = user_image;
      this.connected = true;
    }
  }
})
