import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'
import userStore from "./modules/userStore";

const store = createStore({
  modules: {
    userStore
  },
  plugins: [
    createPersistedState()
  ]
})

export default store