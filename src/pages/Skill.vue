<template>
  <div class="skill">
    <pagebar :title="skill.name" :subtitle="skill.description">
      <btn inverse @click.prevent="edit">Edit skill</btn>
    </pagebar>

    <c-section title="Intents">
      <btn inverse slot="actions" @click.prevent="createIntent">Add an intent</btn>
      <c-table>
        <list-item tag="tbody">
          <table-row 
            clickable 
            @click.prevent="$router.push({ name: 'intent', params: { skillID: skill.id, id: intent.id } })"
            v-for="intent in skill.intents" 
            :key="intent.id">
            <table-col title>{{intent.name}}</table-col>
            <table-col>{{intent.description}}</table-col>
            <table-col>
              {{Object.keys(intent.slots).length}} slot{{Object.keys(intent.slots).length > 1 ? 's' : ''}} - {{intent.training.length}} sample{{intent.training.length > 1 ? 's' : ''}}
            </table-col>
          </table-row>
        </list-item>
      </c-table>
      <blankslate title="No intent yet" v-if="skill.intents.length === 0">
        Add intents to your skill to make it useful!
      </blankslate>
    </c-section>

    <form>
      <modal title="Edit skill" v-model="skillModal">
        <textinput v-validate="'required'" label="Name" v-model="data.name" name="name" data-vv-scope="skill" :err="errors.collect('name', 'skill')" />
        <textinput label="Description" v-model="data.description" />

        <btn slot="actions" danger @click.prevent="remove">Delete</btn>
        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>

    <form>
      <modal title="Create an intent" v-model="intentModal">
        <textinput v-validate="'required'" label="Name" v-model="data.name" name="name" data-vv-scope="intent" :err="errors.collect('name', 'intent')" />
        <textinput label="Description" v-model="data.description" />

        <btn submit slot="actions" @click.prevent="saveIntent">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import ListItem from './../animations/ListItem.vue';
import CTable from './../components/Table.vue';
import TableRow from './../components/TableRow.vue';
import TableCol from './../components/TableCol.vue';
import CSection from './../components/Section.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Pagebar from './../components/Pagebar.vue';

export default {
  name: 'Skill',
  components: { 
    Pagebar, Btn, Modal, Textinput, CSection, Blankslate, ListItem, 
    CTable, TableRow, TableCol
  },
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
      if (await this.$validator.validateAll('intent')) {
        await this.$store.dispatch(actions.upsertIntent.name, this.data);
        this.intentModal = false;
      }
    },
    async save() {
      if (await this.$validator.validateAll('skill')) {
        await this.$store.dispatch(actions.upsertSkill.name, this.data);
        this.skillModal = false;
      }
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.skill {
  
}
</style>
