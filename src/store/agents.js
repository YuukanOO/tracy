import Vue from 'vue';
import { getSlotName } from './../plugins';

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

export function permutate(currentVals, remainingAttrs) {
  let permutations = [];

  remainingAttrs[Object.keys(remainingAttrs)[0]].forEach((attrVal) => {
    const currentValsNew = currentVals.slice(0);
    currentValsNew.push(attrVal);

    if (Object.keys(remainingAttrs).length > 1) {
      const remainingAttrsNew = JSON.parse(JSON.stringify(remainingAttrs));
      delete remainingAttrsNew[Object.keys(remainingAttrs)[0]];

      permutations = permutations.concat(permutate(currentValsNew, remainingAttrsNew));
    } else {
      permutations.push(currentValsNew);
    }
  });

  return permutations;
}

// console.log(permutate([], {
//   color: ['red', 'green'],
//   size: ['big', 'small', 'medium', 'bigger', 'biggest'],
//   type: ['saison', 'oldtimer'],
// }));

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
  // eslint-disable-next-line eqeqeq
  intent: state => skill => id => state.skills[skill].intents.find(o => o.id == id),
  slot: state => skill => intent => id => getters.intent(state)(skill)(intent).slots[id],
  sample: state => skill => intent => id =>
    // eslint-disable-next-line eqeqeq
    getters.intent(state)(skill)(intent).training.find(o => o.id == id),
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

      if (idx !== -1) {
        skill.intents.splice(idx, 1);
      }
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
      slot.name = name !== undefined ? name : slot.name;
      slot.entity = entity !== undefined ? entity : slot.entity;
    }
  },
  addSample(state, { skillID, intentID }) {
    const intent = getters.intent(state)(skillID)(intentID);

    if (intent) {
      const id = generateId(intent.training);

      intent.training.push({
        id,
        text: '',
        slots: [],
      });
    }
  },
  setSample(state, {
    id, skillID, intentID, text, slot,
  }) {
    const sample = getters.sample(state)(skillID)(intentID)(id);

    if (sample) {
      sample.text = text !== undefined ? text : sample.text;

      if (slot) {
        if (!slot.slot) {
          const idx = sample.slots.findIndex(o => o.start === slot.start
            && o.end === slot.end);

          if (idx !== -1) {
            sample.slots.splice(idx, 1);
          }
        } else {
          const existingSlot = sample.slots.find(o => o.start === slot.start
                                                      && o.end === slot.end);

          if (existingSlot) {
            existingSlot.value = slot.value;
            existingSlot.slot = slot.slot;
          } else {
            sample.slots.push(slot);
          }
        }
      }
    }
  },
  deleteSample(state, { id, skillID, intentID }) {
    const intent = getters.intent(state)(skillID)(intentID);

    if (intent) {
      const idx = intent.training.findIndex(o => o.id === id);

      if (idx !== -1) {
        intent.training.splice(idx, 1);
      }
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
  upsertSample({ commit }, data) {
    if (data.id) {
      commit(mutations.setSample.name, data);
    } else {
      commit(mutations.addSample.name, data);
    }
  },
  removeSample({ commit }, ids) {
    commit(mutations.deleteSample.name, ids);
  },
  trainAgent({ state }, id) {
    const result = {
      rasa_nlu_data: {
        common_examples: [],
        regex_features: [],
        entity_synonyms: [],
      },
    };
    const regexFeatures = {};
    const agent = getters.agent(state)(id);

    agent.skills.forEach((skillID) => {
      const skill = getters.skill(state)(skillID);

      skill.intents.forEach((intent) => {
        intent.training.forEach((sample) => {
          const text = sample.text.replace('\n', '');
          const slotValues = {};
          // Let's collect each possible values for each slots
          sample.slots.forEach((s) => {
            const slot = intent.slots[s.slot];
            const name = getSlotName(getters.entity(state))(slot);

            if (slot.entity) {
              const entity = getters.entity(state)(slot.entity);

              if (entity.type === 'values') {
                slotValues[name] = entity.content.split('\n').map(o => o.trim());
                return;
              } else if (entity.type === 'regex') {
                regexFeatures[name] = {
                  name,
                  pattern: entity.content,
                };
              }
            }

            slotValues[name] = [s.value];
          });

          if (Object.keys(slotValues).length > 0) {
            const combinations = permutate([], slotValues);

            console.log(combinations);
          } else {
            result.rasa_nlu_data.common_examples.push({
              text,
              intent: intent.name,
              entities: [],
            });
          }
        });
      });

      // skill.intents.forEach((intent) => {
      //   const transforms = {};
      //   const entities = {};

      //   let atLeastOneEntity = false;

      //   Object.values(intent.slots).forEach((o) => {
      //     let n = o.name;

      //     if (o.entity) {
      //       const ent = getters.entity(state)(o.entity);

      //       atLeastOneEntity = true;
      //       n = ent.name;

      //       if (ent.type === 'values') {
      //         entities[o.id] = ent.content.split('\n').map(oo => oo.trim());
      //       } else if (ent.type === 'regex') {
      //         regexFeatures[n] = {
      //           name: n,
      //           pattern: ent.content,
      //         };
      //       }
      //     }

      //     transforms[o.id] = (v, offset = 0) => ({
      //       start: v.start + offset,
      //       end: v.end + offset,
      //       value: v.value,
      //       entity: n,
      //     });
      //   });

      //   intent.training.forEach((sample) => {
      //     const text = sample.text.replace(/\n/, '');

      //     // Each sample should be duplicated based on entity
      //     if (sample.slots.length === 0) {
      //       // No slots defined, just add the sample
      //       result.rasa_nlu_data.common_examples.push({
      //         text,
      //         intent: intent.name,
      //         entities: [],
      //       });
      //     } else if (atLeastOneEntity) {
      //       for (let i = 0; i < sample.slots.length; i += 1) {
      //         const sampleSlot = sample.slots[i];
      //         const availableEntities = entities[sampleSlot.slot];

      //         if (availableEntities) {
      //           availableEntities.forEach((e) => {
      //             const initialLength = sampleSlot.end - sampleSlot.start;
      //             const offset = e.length - initialLength;

      //             const newText = text.substring(0, sampleSlot.start) + e + text.substring(sampleSlot.end);

      //             result.rasa_nlu_data.common_examples.push({
      //               text: newText,
      //               intent: intent.name,
      //               entities: [
      //                 ...sample.slots.slice(0, i),
      //                 ...sample.slots.slice(i + 1),
      //               ].map(v => transforms[v.slot](v, v.start > sampleSlot.start ? offset : 0)).concat({
      //                 ...transforms[sampleSlot.slot](sampleSlot),
      //                 end: sampleSlot.start + e.length,
      //                 value: e,
      //               }),
      //             });
      //           });
      //         }
      //       }
      //     } else {
      //       result.rasa_nlu_data.common_examples.push({
      //         text,
      //         intent: intent.name,
      //         entities: sample.slots.map(v => transforms[v.slot](v)),
      //       });
      //     }
      //   });
      // });
    });

    result.rasa_nlu_data.regex_features = Object.values(regexFeatures);

    return result;
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
