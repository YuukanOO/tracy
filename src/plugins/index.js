import Vue from 'vue';

export const getSlotName = entityGetter => (slot) => {
  if (slot.name) {
    return slot.name;
  }

  if (!slot.entity) {
    return '';
  }

  return entityGetter(slot.entity).name;
};

export default function installPlugins(store) {
  Vue.use({
    install(vue) {
      // eslint-disable-next-line no-param-reassign
      vue.prototype.$getSlotName = getSlotName(store.getters.entity);
    },
  });
}
