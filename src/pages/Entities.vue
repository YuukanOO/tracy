<template>
  <div class="entities">
    <pagebar title="Entities">
      <btn inverse @click.prevent="create">Add an entity</btn>
    </pagebar>

    <blankslate v-if="entities.length === 0" title="No entity yet!">
      Looks like you do not have any entity yet! Go ahead and create one!
    </blankslate>

    <form>
      <modal v-model="entityModal" title="Create an entity">
        <textinput label="Name" v-model="entity.name" />
        <div class="entity__types">
          <radio label="Values" value="values" v-model="entity.type" />
          <radio label="Regex" value="regex" v-model="entity.type" />
        </div>
        <textinput label="Entity values" multiple v-model="entity.content" v-if="entity.type === 'values'" />
        <textinput label="Regex value" v-model="entity.content" v-if="entity.type === 'regex'" />

        <btn slot="actions" submit>Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Textinput from './../components/Textinput.vue';
import Radio from './../components/Radio.vue';
import Pagebar from './../components/Pagebar.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Btn from './../components/Btn.vue';

export default {
  name: 'Entities',
  components: { Pagebar, Btn, Blankslate, Modal, Textinput, Radio },
  data() {
    return {
      entityModal: false,
      entity: {},
    };
  },
  computed: {
    ...mapGetters(['entities']),
  },
  methods: {
    create() {
      this.entity = { name: '', type: 'values', content: '' };
      this.entityModal = true;
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.entities {
  @include col($x: stretch, $y: flex-start);
  flex: 1;
}

.entity__types {
  @include row($y: center);

  & > * {
    margin-top: 0 !important;
    margin-right: baseline();
  }

  & + * {
    margin-top: baseline();
  }
}
</style>
