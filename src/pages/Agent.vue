<template>
  <div class="agent">
    <pagebar :title="agent.name" :subtitle="agent.description">
      <btn inverse @click.prevent="edit">Edit agent</btn>
    </pagebar>

    <form>
      <modal title="Edit agent" v-model="agentModal">
        <textinput label="Name" v-model="data.name" />
        <textinput label="Description" v-model="data.description" />

        <btn slot="actions" danger @click.prevent="remove">Delete</btn>
        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Pagebar from './../components/Pagebar.vue';

export default {
  name: 'Agent',
  components: { Pagebar, Btn, Modal, Textinput },
  data() {
    return {
      agentModal: false,
      data: {}
    };
  },
  computed: {
    agent() {
      return this.$store.getters.agent(this.$route.params.id);
    }
  },
  methods: {
    edit() {
      this.data = { ...this.agent };
      this.agentModal = true;
    },
    async remove() {
      await this.$store.dispatch(actions.removeAgent.name, this.data.id);
      this.$router.push({ name: 'agents' });
    },
    async save() {
      await this.$store.dispatch(actions.upsertAgent.name, this.data);
      this.agentModal = false;
    },
  },
}
</script>
