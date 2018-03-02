import Vue from 'vue';

import createStore from './store';
import createRouter from './router';
import installPlugins from './plugins';

import App from './layouts/App.vue';

const store = createStore();
const router = createRouter();

installPlugins(store);

const vm = new Vue({
  store,
  router,
  render: h => h(App),
});

vm.$mount('#root');
