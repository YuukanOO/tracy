import Vue from 'vue';
import Router from 'vue-router';

import Agents from './../pages/Agents.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    routes: [
      {
        path: '/',
        component: Agents,
      },
    ],
  });
}
