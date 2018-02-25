<template>
  <div class="skill">
    <pagebar :title="skill.name" :subtitle="skill.description">
      <btn inverse @click.prevent="edit">Edit skill</btn>
    </pagebar>

    <c-section title="Intents">
      <btn inverse slot="actions" @click.prevent="createIntent">Add an intent</btn>
      <list-item class="skill__intents">
        <list-element
          v-for="intent in skill.intents"
          :to="{ name: 'intent', params: { skillID: skill.id, id: intent.id } }"
          :key="intent.id"
          :title="intent.name" 
          :subtitle="intent.description"
        />
      </list-item>
      <blankslate title="No intent yet" v-if="skill.intents.length === 0">
        Add intents to your skill!
      </blankslate>
    </c-section>

    <form>
      <modal title="Edit skill" v-model="skillModal">
        <textinput label="Name" v-model="data.name" />
        <textinput label="Description" v-model="data.description" />

        <btn slot="actions" danger @click.prevent="remove">Delete</btn>
        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>

    <form>
      <modal title="Create an intent" v-model="intentModal">
        <textinput label="Name" v-model="data.name" />
        <textinput label="Description" v-model="data.description" />

        <btn submit slot="actions" @click.prevent="saveIntent">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import ListItem from './../animations/ListItem.vue';
import ListElement from './../components/ListElement.vue';
import CSection from './../components/Section.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Pagebar from './../components/Pagebar.vue';

export default {
  name: 'Skill',
  components: { Pagebar, Btn, Modal, Textinput, CSection, Blankslate, ListItem, ListElement },
  data() {
    return {
      skillModal: false,
      intentModal: false,
      data: {},
    };
  },
  computed: {
    skill() {
      return this.$store.getters.skill(this.$route.params.id);
    },
  },
  methods: {
    createIntent() {
      this.data = { name: '', description: '', skillID: this.skill.id };
      this.intentModal = true;
    },
    edit() {
      this.data = { ...this.skill };
      this.skillModal = true;
    },
    async remove() {
      await this.$store.dispatch(actions.removeSkill.name, this.data.id);
      this.$router.push({ name: 'skills' });
    },
    async saveIntent() {
      await this.$store.dispatch(actions.upsertIntent.name, this.data);
      this.intentModal = false;
    },
    async save() {
      await this.$store.dispatch(actions.upsertSkill.name, this.data);
      this.skillModal = false;
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.skill {
  
}
</style>
