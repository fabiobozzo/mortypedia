export default {
  namespaced: true,
  state() {
    return {
      name: "",
      species: "",
      status: "",
      gender: "",
    };
  },
  getters: {
    filter(state) {
      return {
        name: state.name,
        species: state.species,
        status: state.status,
        gender: state.gender,
      };
    },
  },
  mutations: {
    setFilter(state, payload) {
      state.name = payload.name || "";
      state.species = payload.species || "";
      state.status = payload.status || "";
      state.gender = payload.gender || "";
    },
  },
  actions: {
    setFilter(context, payload) {
      context.commit("setFilter", payload);
    },
  },
};
