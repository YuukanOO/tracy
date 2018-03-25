const getters = {
  is: state => mode => state.mode === mode,
  mode: state => state.mode,
};

const mutations = {
  setMode(state, mode) {
    state.mode = mode; // eslint-disable-line
  },
};

export const actions = {
  updateMode({ commit }, mode) {
    commit(mutations.setMode.name, mode);
  },
};

const state = {
  mode: 'rasa',
};

export default {
  actions,
  getters,
  mutations,
  state,
};
