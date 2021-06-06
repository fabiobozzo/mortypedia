export default {
  namespaced: true,
  state() {
    return {
      type: "",
      dimension: "",
    };
  },
  getters: {
    filter(state) {
      return {
        type: state.type,
        dimension: state.dimension,
      };
    },
  },
  mutations: {
    setFilter(state, payload) {
      state.type = payload.type || "";
      state.dimension = payload.dimension || "";
    },
  },
  actions: {
    setFilter(context, payload) {
      context.commit("setFilter", payload);
    },
  },
};
