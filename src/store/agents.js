import Vue from 'vue';

const mutations = {
  addAgent(state, { name, description }) {
    const id = Object.keys(state.agents).length + 1;

    Vue.set(state.agents, id, {
      id,
      name,
      description,
      skills: [],
    });
  },
  deleteAgent(state, id) {
    Vue.delete(state.agents, id);
  },
  setAgent(state, { id, name, description }) {
    const agent = state.agents[id];

    if (agent) {
      agent.name = name;
      agent.description = description;
    }
  },
};

export const actions = {
  upsertAgent({ commit }, data) {
    if (data.id) {
      commit(mutations.setAgent.name, data);
    } else {
      commit(mutations.addAgent.name, data);
    }
  },
  removeAgent({ commit }, id) {
    commit(mutations.deleteAgent.name, id);
  },
};

const getters = {
  agents: state => Object.values(state.agents),
  skills: state => Object.values(state.skills),
  entities: state => Object.values(state.entities),
  agent: state => id => state.agents[id],
};

const state = {
  agents: {},
  skills: {},
  entities: {},
};

export default {
  actions,
  getters,
  mutations,
  state,
};
