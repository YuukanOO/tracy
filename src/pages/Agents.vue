<template>
  <div class="agents">
    <pagebar title="Agents">
      <btn inverse @click.prevent="agentModal = true">Add an agent</btn>
    </pagebar>

    <blankslate v-if="agents.length === 0" title="No agent yet!">
      Looks like you do not have any agent yet! Go ahead and create one!
    </blankslate>

    <modal title="Create an agent" v-model="agentModal">
      <textinput label="Name" v-model="agent.name" />

      <btn slot="actions">Create</btn>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Blankslate from './../components/Blankslate.vue';
import Pagebar from './../components/Pagebar.vue';
import Btn from './../components/Btn.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';

export default {
  name: 'Agents',
  components: { Pagebar, Btn, Modal, Blankslate, Textinput },
  data() {
    return {
      agentModal: false,
      agent: {
        id: 0,
        name: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters(['agents']),
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.agents {
  @include col($x: stretch, $y: flex-start);
  flex: 1;
}
</style>
