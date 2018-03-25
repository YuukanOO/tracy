import { getSlotName } from './../plugins';

export default function train(state, getters, id) {
  const agent = getters.agent(state)(id);
  const intents = {};
  const entitySet = new Set();

  agent.skills.forEach((skillID) => {
    const skill = getters.skill(state)(skillID);

    skill.intents.forEach((intent) => {
      const utterances = [];

      intent.training.forEach((sample) => {
        const data = [];
        let curIdx = 0;
        let text;

        sample.slots.sort((a, b) => a.start > b.start).forEach((slot) => {
          text = sample.text.substring(curIdx, slot.start);

          if (text) {
            data.push({ text });
          }

          const s = intent.slots[slot.slot];
          const e = getters.entity(state)(s.entity);

          if (e) {
            entitySet.add(e.id);
          }

          data.push({
            text: sample.text.substring(slot.start, slot.end),
            entity: e.name,
            slot_name: getSlotName(getters.entity(state))(s),
          });
          curIdx = slot.end;
        });

        text = sample.text.substring(curIdx);

        if (text) {
          data.push({ text });
        }

        utterances.push({ data });
      });

      intents[intent.name] = {
        utterances,
      };
    });
  });

  return {
    intents,
    entities: getters.entities(state).filter(e => entitySet.has(e.id)).reduce((prev, cur) => {
      if (cur.builtin) {
        prev[cur.name] = {}; // eslint-disable-line
      } else if (cur.type === 'values') {
        let useSynonyms = false; // eslint-disable-line

        const data = {
          data: cur.content.split('\n').map((o) => {
            const r = {};
            const values = o.split(',').map(oo => oo.trim());

            r.value = values[0]; // eslint-disable-line
            r.synonyms = values.slice(1);

            if (r.synonyms.length > 0) {
              useSynonyms = true;
            }

            return r;
          }),
          automatically_extensible: cur.extensible,
        };

        data.use_synonyms = useSynonyms;

        // eslint-disable-next-line
        prev[cur.name] = data;
      }

      return prev;
    }, {}),
    language: 'en', // TODO make it settable via the UI
  };
}
