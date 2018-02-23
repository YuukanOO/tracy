const mutations = {
  addAgent(state, { name, description }) {
    state.agents.push({
      id: state.agents.length + 1,
      name,
      description,
    });
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
};

const getters = {
  agents: state => state.agents,
};

const state = {
  agents: [],
};

export default {
  actions,
  getters,
  mutations,
  state,
};
