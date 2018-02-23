import Vue from 'vue';
import Router from 'vue-router';

import Agents from './../pages/Agents.vue';
import Agent from './../pages/Agent.vue';
import Skills from './../pages/Skills.vue';
import Entities from './../pages/Entities.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    routes: [
      {
        path: '/agents',
        name: 'agents',
        component: Agents,
      },
      {
        path: '/agent/:id',
        name: 'agent',
        component: Agent,
      },
      {
        path: '/entities',
        name: 'entities',
        component: Entities,
      },
      {
        path: '/skills',
        name: 'skills',
        component: Skills,
      },
    ],
  });
}
