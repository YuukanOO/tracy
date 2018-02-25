<template>
  <div class="agents">
    <pagebar title="Agents">
      <btn inverse @click.prevent="create">Add an agent</btn>
    </pagebar>

    <list-item class="agents__list">
      <card 
        v-for="agent in agents"
        :key="agent.id"
        class="agents__item"
        :to="{ name: 'agent', params: { id: agent.id } }"
        :title="agent.name"
        :subtitle="agent.description"
      >
        {{agent.skills.length}} skill{{agent.skills.length > 1 ? 's' : ''}}
      </card>
    </list-item>

    <blankslate v-if="agents.length === 0" title="No agent yet!">
      Looks like you do not have any agent yet! Go ahead and create one!
    </blankslate>
    
    <form>
      <modal title="Create an agent" v-model="agentModal">
        <textinput label="Name" v-model="agent.name" />
        <textinput label="Description" v-model="agent.description" />

        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Blankslate from './../components/Blankslate.vue';
import Pagebar from './../components/Pagebar.vue';
import Btn from './../components/Btn.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';
import Card from './../components/Card.vue';

import ListItem from './../animations/ListItem.vue';

import { actions } from './../store/agents';

export default {
  name: 'Agents',
  components: { Pagebar, Btn, Modal, Blankslate, Textinput, ListItem, Card },
  data() {
    return {
      agentModal: false,
      agent: {},
    };
  },
  computed: {
    ...mapGetters(['agents']),
  },
  methods: {
    create() {
      this.agent = { name: '', description: '' };
      this.agentModal = true;
    },
    async save() {
      await this.$store.dispatch(actions.upsertAgent.name, this.agent);
      this.agentModal = false;
    },
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.agents {
  @include col($x: stretch, $y: flex-start);
  flex: 1;

  &__list {
    @include row($gap: 27px);
  }

  &__item {
    @include cell(1, $grow: 0);

    @include on(tablet) {
      @include cell(1/3, $grow: 0);
    }

    @include on(desktop) {
      @include cell(1/4, $grow: 0);
    }
  }
}
</style>
