<template>
  <div class="agent">
    <pagebar :title="agent.name" :subtitle="agent.description">
      <btn inverse @click.prevent="edit">Edit agent</btn>
    </pagebar>

    <c-section title="Skills">
      <btn slot="actions" inverse @click.prevent="editSkills">Edit skills</btn>
      <blankslate title="No skill yet">
        Add a skill to your agent to make it useful!
      </blankslate>
    </c-section>

    <form>
      <modal title="Edit agent" v-model="agentModal">
        <textinput label="Name" v-model="data.name" />
        <textinput label="Description" v-model="data.description" />

        <btn slot="actions" danger @click.prevent="remove">Delete</btn>
        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>

    <form>
      <modal title="Edit skills" v-model="skillsModal">

      </modal>
    </form>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import CSection from './../components/Section.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Pagebar from './../components/Pagebar.vue';

export default {
  name: 'Agent',
  components: { Pagebar, Btn, Modal, Textinput, CSection, Blankslate },
  data() {
    return {
      agentModal: false,
      skillsModal: false,
      data: {}
    };
  },
  computed: {
    agent() {
      return this.$store.getters.agent(this.$route.params.id);
    },
  },
  methods: {
    editSkills() {
      this.skillsModal = true;
    },
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
