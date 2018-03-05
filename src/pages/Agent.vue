<template>
  <div class="agent">
    <pagebar :title="agent.name" :subtitle="agent.description">
      <btn inverse @click.prevent="train">Train</btn>
      <btn inverse @click.prevent="edit">Edit agent</btn>
    </pagebar>

    <c-section title="Skills">
      <btn slot="actions" inverse @click.prevent="editSkills">Edit skills</btn>
      <c-table>
        <list-item tag="tbody">
          <table-row 
            clickable 
            @click.prevent="$router.push({ name: 'skill', params: { id: skill.id } })"
            v-for="skill in agentSkills" 
            :key="skill.id">
            <table-col title>{{skill.name}}</table-col>
            <table-col>{{skill.description}}</table-col>
          </table-row>
        </list-item>
      </c-table>
      <blankslate title="No skill yet" v-if="agent.skills.length === 0">
        Add a skill to your agent to make it useful!
      </blankslate>
    </c-section>

    <modal title="Train data" v-model="trainModal">
      <textinput label="JSON" ref="trainInput" v-model="trainData" multiple rows="15" />
      <btn slot="actions" @click.prevent="copyTrainData">{{copyMsg}}</btn>
    </modal>

    <form>
      <modal title="Edit agent" v-model="agentModal">
        <textinput v-validate="'required'" :err="errors.collect('name')" name="name" label="Name" v-model="data.name" />
        <textinput v-validate="'required'" :err="errors.collect('description')" label="Description" v-model="data.description" name="description" />

        <btn slot="actions" danger @click.prevent="remove">Delete</btn>
        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>

    <form>
      <modal title="Edit skills" v-model="skillsModal">
        <c-table inverse>
          <table-row 
            clickable
            @click.prevent="toggleSkill(skill.id)"
            v-for="skill in skills"
            :key="skill.id">
            <table-col title>{{skill.name}}</table-col>
            <table-col class="selected-col">
              <checkbox :value="hasSkill(skill.id)" />
            </table-col>
          </table-row>
        </c-table>

        <btn slot="actions" submit @click.prevent="saveSkills">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import ListItem from './../animations/ListItem.vue';

import Checkbox from './../components/Checkbox.vue';
import CSection from './../components/Section.vue';
import CTable from './../components/Table.vue';
import TableRow from './../components/TableRow.vue';
import TableCol from './../components/TableCol.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Pagebar from './../components/Pagebar.vue';

export default {
  name: 'Agent',
  components: {
    Pagebar, Btn, Modal, Textinput, CSection, Blankslate,
    CTable, TableRow, TableCol, Checkbox, ListItem
  },
  data() {
    return {
      agentModal: false,
      skillsModal: false,
      trainModal: false,
      trainData: '',
      selectedSkills: [],
      data: {},
      copyMsg: 'Copy to clipboard',
    };
  },
  computed: {
    agent() {
      return this.$store.getters.agent(this.$route.params.id);
    },
    agentSkills() {
      return this.agent.skills.map(o => this.$store.getters.skill(o));
    },
    skills() {
      return this.$store.getters.skills;
    },
  },
  methods: {
    async train() {
      this.trainData = JSON.stringify(await this.$store.dispatch(actions.trainAgent.name, this.agent.id), null, 2);
      this.trainModal = true;
    },
    copyTrainData() {
      this.copyMsg = 'Copied to clipboard!';
      this.$refs.trainInput.select();
      document.execCommand('copy');

      setTimeout(() => this.copyMsg = 'Copy to clipboard', 1500);
    },
    hasSkill(id) {
      return this.selectedSkills.indexOf(id) !== -1;
    },
    toggleSkill(id) {
      const idx = this.selectedSkills.indexOf(id);

      if (idx < 0) {
        this.selectedSkills.push(id);
      } else {
        this.selectedSkills.splice(idx, 1);
      }
    },
    editSkills() {
      this.selectedSkills = [...this.agent.skills];
      this.skillsModal = true;
    },
    async saveSkills() {
      await this.$store.dispatch(actions.editAgentSkills.name, {
        id: this.agent.id,
        skills: this.selectedSkills,
      });
      this.skillsModal = false;
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

<style lang="scss">
.selected-col {
  text-align: right;
}
</style>
