const getters = {
  is: state => mode => state.mode === mode,
  lang: state => state.lang,
  mode: state => state.mode,
};

const mutations = {
  setMode(state, mode) {
    state.mode = mode; // eslint-disable-line
  },
  setLang(state, lang) {
    state.lang = lang; // eslint-disable-line
  },
};

export const actions = {
  updateMode({ commit }, mode) {
    commit(mutations.setMode.name, mode);
  },
  updateLang({ commit }, lang) {
    commit(mutations.setLang.name, lang);
  },
};

const state = {
  mode: 'rasa',
  lang: 'en',
};

export default {
  actions,
  getters,
  mutations,
  state,
};
