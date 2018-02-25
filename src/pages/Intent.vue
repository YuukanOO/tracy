<template>
  <div class="intent">
    <pagebar :prefix="skill.name" :title="intent.name" :subtitle="intent.description">
      <btn inverse @click.prevent="edit">Edit intent</btn>
    </pagebar>

    <form>
      <modal title="Edit intent" v-model="intentModal">
        <textinput label="Name" v-model="data.name" />
        <textinput label="Description" v-model="data.description" />

        <btn slot="actions" danger @click.prevent="remove">Delete</btn>
        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>

    <c-section title="Slots">
      <btn inverse slot="actions">Add a slot</btn>
      <blankslate title="No slot yet">
        Add a slot to extract entities from text!
      </blankslate>
    </c-section>

    <c-section title="Training data">
      <btn inverse slot="actions">Add a sample</btn>
      <blankslate title="No training data yet">
        Add training data to train your intent!
      </blankslate>
    </c-section>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import Pagebar from './../components/Pagebar.vue';
import Btn from './../components/Btn.vue';
import CSection from './../components/Section.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';

export default {
  name: 'Intent',
  components: { Blankslate, CSection, Btn, Pagebar, Modal, Textinput },
  data() {
    return {
      intentModal: false,
      data: {},
    };
  },
  computed: {
    intent() {
      return this.$store.getters.intent(this.$route.params.skillID)(this.$route.params.id);
    },
    skill() {
      return this.$store.getters.skill(this.$route.params.skillID);
    },
  },
  methods: {
    edit() {
      this.data = { ...this.intent };
      this.intentModal = true;
    },
    async save() {
      await this.$store.dispatch(actions.upsertIntent.name, this.data);
      this.intentModal = false;
    },
    async remove() {
      await this.$store.dispatch(actions.removeIntent.name, this.data);
      this.$router.push({ name: 'skill', params: { id: this.$route.params.skillID } });
    },
  },
}
</script>
