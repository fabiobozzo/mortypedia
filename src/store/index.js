import { createStore } from "vuex";

import charactersModule from "./modules/characters.js";
import locationsModule from "./modules/locations.js";
import episodesModule from "./modules/episodes.js";

export default createStore({
  modules: {
    characters: charactersModule,
    locations: locationsModule,
    episodes: episodesModule,
  },
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login(context) {
      context.commit("login");
    },
    logout(context) {
      context.commit("logout");
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
});
