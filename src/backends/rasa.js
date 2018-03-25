import { getSlotName } from './../plugins';

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

export default function train(state, getters, id) {
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

        if (!text) {
          return;
        }

        const slotValues = {};
        const synonyms = {};

        // Let's collect each possible values for each slots
        sample.slots.sort((a, b) => a.start > b.start).forEach((s, i) => {
          const slot = intent.slots[s.slot];

          // Prefix it with index to ensure sorting
          const slotName = getSlotName(getters.entity(state))(slot);
          const name = `${i}_${slotName}`;

          if (slot.entity) {
            const entity = getters.entity(state)(slot.entity);

            if (!entity.builtin) {
              if (entity.type === 'values') {
              // Check for synonyms
                slotValues[name] = entity.content.split('\n').reduce((acc, o) => {
                  const values = o.split(',').map(oo => oo.trim());

                  if (values.length > 1) {
                    values.slice(1).forEach((v) => {
                      synonyms[v] = values[0]; // eslint-disable-line
                    });
                  }

                  return acc.concat(values);
                }, []);
                return;
              } else if (entity.type === 'regex') {
                regexFeatures[name] = {
                  name: slotName,
                  pattern: entity.content,
                };
              }
            }
          }

          slotValues[name] = [s.value];
        });

        // And then generate all possible text with entities and values accordingly
        if (Object.keys(slotValues).length > 0) {
          const combinations = permutate([], slotValues);

          combinations.forEach((values) => {
            let newText = '';
            let curStart = 0;
            let curOffset = 0;
            const entities = [];

            values.forEach((value, i) => {
              const sampleSlot = sample.slots[i];

              newText += text.substring(curStart, sampleSlot.start) + value;
              curStart = sampleSlot.end;

              entities.push({
                start: sampleSlot.start + curOffset,
                end: sampleSlot.start + curOffset + value.length,
                value: (synonyms[value] || value),
                entity: getSlotName(getters.entity(state))(intent.slots[sampleSlot.slot]),
              });

              curOffset += (value.length - (sampleSlot.end - sampleSlot.start));
            });

            newText += text.substring(curStart);

            result.rasa_nlu_data.common_examples.push({
              text: newText,
              intent: intent.name,
              entities,
            });
          });
        } else {
          result.rasa_nlu_data.common_examples.push({
            text,
            intent: intent.name,
            entities: [],
          });
        }
      });
    });
  });

  result.rasa_nlu_data.regex_features = Object.values(regexFeatures);

  return result;
}
