import Vue from 'vue';

const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#009688',
  '#795548',
  '#607D8B',
  '#000000',
];

function generateId(obj) {
  if (obj.length !== undefined) {
    if (obj.length === 0) {
      return 1;
    }

    return Math.max(...obj.map(o => o.id)) + 1;
  }

  const max = Math.max(...Object.keys(obj));

  if (max < 0) {
    return 1;
  }

  return max + 1;
}

const getters = {
  agents: state => Object.values(state.agents),
  skills: state => Object.values(state.skills),
  entities: state => Object.values(state.entities),
  entity: state => id => state.entities[id],
  agent: state => id => state.agents[id],
  skill: state => id => state.skills[id],
  intent: state => skill => id => state.skills[skill].intents.find(o => o.id === id),
  slot: state => skill => intent => id => getters.intent(state)(skill)(intent).slots[id],
};

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
    const agent = getters.agent(state)(id);

    if (agent) {
      agent.name = name;
      agent.description = description;
    }
  },
  setAgentSkills(state, { id, skills }) {
    const agent = getters.agent(state)(id);

    if (agent) {
      agent.skills = skills;
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
    const entity = getters.entity(state)(id);

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
      intents: [],
    });
  },
  setSkill(state, { id, name, description }) {
    const skill = getters.skill(state)(id);

    if (skill) {
      skill.name = name;
      skill.description = description;
    }
  },
  deleteSkill(state, id) {
    Vue.delete(state.skills, id);
  },
  addIntent(state, { name, description, skillID }) {
    const skill = state.skills[skillID];

    if (skill) {
      const id = generateId(skill.intents);

      skill.intents.push({
        id,
        skillID,
        name,
        description,
        slots: {},
        training: [],
      });
    }
  },
  setIntent(state, {
    id, skillID, name, description,
  }) {
    const intent = getters.intent(state)(skillID)(id);

    if (intent) {
      intent.name = name;
      intent.description = description;
    }
  },
  deleteIntent(state, { id, skillID }) {
    const skill = getters.skill(state)(skillID);

    if (skill) {
      const idx = skill.intents.findIndex(o => o.id === id);

      skill.intents.splice(idx, 1);
    }
  },
  addSlot(state, { skillID, intentID }) {
    const intent = getters.intent(state)(skillID)(intentID);

    if (intent) {
      const id = generateId(intent.slots);
      const tookColors = Object.values(intent.slots).map(o => o.color);
      const availableColors = colors.filter(o => tookColors.indexOf(o) === -1);
      const color = availableColors[Math.floor(Math.random() * availableColors.length)];

      Vue.set(intent.slots, id, {
        id,
        name: '',
        entity: '',
        color,
      });
    }
  },
  deleteSlot(state, { id, skillID, intentID }) {
    const intent = getters.intent(state)(skillID)(intentID);

    if (intent) {
      Vue.delete(intent.slots, id);
    }
  },
  setSlot(state, {
    id, skillID, intentID, name, entity,
  }) {
    const slot = getters.slot(state)(skillID)(intentID)(id);

    if (slot) {
      slot.name = name || slot.name;
      slot.entity = entity || slot.entity;
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
  editAgentSkills({ commit }, data) {
    commit(mutations.setAgentSkills.name, data);
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
  removeSkill({ commit }, id) {
    commit(mutations.deleteSkill.name, id);
  },
  upsertIntent({ commit }, data) {
    if (data.id) {
      commit(mutations.setIntent.name, data);
    } else {
      commit(mutations.addIntent.name, data);
    }
  },
  removeIntent({ commit }, ids) {
    commit(mutations.deleteIntent.name, ids);
  },
  upsertSlot({ commit }, data) {
    if (data.id) {
      commit(mutations.setSlot.name, data);
    } else {
      commit(mutations.addSlot.name, data);
    }
  },
  removeSlot({ commit }, ids) {
    commit(mutations.deleteSlot.name, ids);
  },
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
