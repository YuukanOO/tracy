const mutations = {
  addAgent(state, { name, description }) {
    state.agents.push({
      id: state.agents.length + 1,
      name,
      description,
      skills: [],
    });
  },
  deleteAgent(state, id) {
    const idx = state.agents.findIndex(o => o.id === id);

    if (idx >= 0) {
      state.agents.splice(idx, 1);
    }
  },
  setAgent(state, { id, name, description }) {
    const agent = state.agents.find(o => o.id === id);

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
  agents: state => state.agents,
  skills: state => state.skills,
  entities: state => state.entities,
  agent: state => id => state.agents[id - 1],
};

const state = {
  agents: [],
  skills: [],
  entities: [],
};

export default {
  actions,
  getters,
  mutations,
  state,
};
