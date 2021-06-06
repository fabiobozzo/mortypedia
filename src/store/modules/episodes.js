export default {
  namespaced: true,
  state() {
    return {
      season: "",
    };
  },
  getters: {
    filter(state) {
      return {
        season: state.season,
      };
    },
  },
  mutations: {
    setFilter(state, payload) {
      state.season = payload.season || "";
    },
  },
  actions: {
    setFilter(context, payload) {
      context.commit("setFilter", payload);
    },
  },
};
