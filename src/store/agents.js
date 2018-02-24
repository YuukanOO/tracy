import Vue from 'vue';

function generateId(obj) {
  const max = Math.max(...Object.keys(obj));

  if (max < 0) {
    return 1;
  }

  return max + 1;
}

const mutations = {
  addAgent(state, { name, description }) {
    const id = generateId(state.agents);

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
  addEntity(state, { name, type, content }) {
    const id = generateId(state.entities);

    Vue.set(state.entities, id, {
      id,
      name,
      type,
      content,
    });
  },
  deleteEntity(state, id) {
    Vue.delete(state.entities, id);
  },
  setEntity(state, {
    id, name, type, content,
  }) {
    const entity = state.entities[id];

    if (entity) {
      entity.name = name;
      entity.type = type;
      entity.content = content;
    }
  },
  addSkill(state, { name, description }) {
    const id = generateId(state.skills);

    Vue.set(state.skills, id, {
      id,
      name,
      description,
      slots: {},
      data: [],
    });
  },
  setSkill(state, { id }) {
    const skill = state.skills[id];

    if (skill) {

    }
  },
  deleteSkill(state, id) {
    Vue.delete(state.skills, id);
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
  upsertEntity({ commit }, data) {
    if (data.id) {
      commit(mutations.setEntity.name, data);
    } else {
      commit(mutations.addEntity.name, data);
    }
  },
  removeEntity({ commit }, id) {
    commit(mutations.deleteEntity.name, id);
  },
  upsertSkill({ commit }, data) {
    if (data.id) {
      commit(mutations.setSkill.name, data);
    } else {
      commit(mutations.addSkill.name, data);
    }
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
