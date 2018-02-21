import Vue from 'vue';

import createStore from './store';
import createRouter from './router';

import App from './layouts/App.vue';

const store = createStore();
const router = createRouter();

const vm = new Vue({
  store,
  router,
  render: h => h(App),
});

vm.$mount('#root');
