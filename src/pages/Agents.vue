<template>
  <div class="agents">
    <pagebar title="Agents">
      <btn inverse @click.prevent="create">Add an agent</btn>
    </pagebar>

    <blankslate v-if="agents.length === 0" title="No agent yet!">
      Looks like you do not have any agent yet! Go ahead and create one!
    </blankslate>

    <transition-group class="agents__list" name="pop" tag="div">
      <router-link :to="{ name: 'agent', params: { id: agent.id } }" v-for="agent in agents" :key="agent.id" class="agent-item">
          <span class="agent-item__name">{{agent.name}}</span>
          <span class="agent-item__description">{{agent.description}}</span>
          <span class="agent-item__meta">{{agent.skills.length}} skill{{agent.skills.length > 1 ? 's' : ''}}</span>
      </router-link>
    </transition-group>

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

import { actions } from './../store/agents';

export default {
  name: 'Agents',
  components: { Pagebar, Btn, Modal, Blankslate, Textinput },
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
}

.agent-item {
  @include cell(1, $grow: 0);

  @include on(tablet) {
    @include cell(1/3, $grow: 0);
  }

  @include on(desktop) {
    @include cell(1/4, $grow: 0);
  }

  background-color: white;
  border-radius: 35px;
  outline: none;
  text-decoration: none;
  transition: all 0.2s;

  &__name {
    color: color(brand);
    padding: baseline();
    padding-bottom: 0;
    display: block;
    font-weight: bold;
  }

  &__description {
    @include type(small);
    color: color(text, 1);
    display: block;
    padding: baseline();
    padding-top: 0;
  }

  &__meta {
    @include type(small);
    border-top: 1px solid color(divider);
    color: color(text, 1);
    display: block;
    text-align: right;
    padding: baseline(0.5) baseline();
  }

  transform: scale(1);

  &.pop-enter, 
  &.pop-leave-to {
    transform: scale(0);
  }

  &:focus {
    box-shadow: 0 0 10px color(brand, 2);
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
}
</style>
