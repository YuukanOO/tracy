import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import agents from './agents';
import settings from './settings';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    modules: { agents, settings },
    plugins: [createPersistedState()],
  });
}
