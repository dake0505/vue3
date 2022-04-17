import { createStore } from "vuex";
import userStore from "./userStore";

const store = createStore({
  modules: {
    userStore
  }
})

export default store