import Vue from 'vue';
import Vuex from 'vuex';

import agents from './agents';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    modules: { agents },
  });
}
