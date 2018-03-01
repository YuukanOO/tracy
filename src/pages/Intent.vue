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
      <btn inverse slot="actions" @click.prevent="createSlot">Add a slot</btn>
      <c-table class="intent__table">
        <list-item tag="tbody">
          <table-row v-for="slot in slots" :key="slot.id">
            <table-col class="table-col--color"><div :style="{ backgroundColor: slot.color }"></div></table-col>
            <table-col input><input type="text" :value="slot.name" @input="setSlotName(slot.id, $event.target.value)" /></table-col>
            <table-col input>
              <select :value="slot.entity" @change="setSlotEntity(slot.id, $event.target.value)">
                <option value="">---</option>
                <option v-for="entity in entities" :key="entity.id" :value="entity.id">
                  {{entity.name}}
                </option>
              </select>
            </table-col>
            <table-col action>
              <delete-btn @click.prevent="removeSlot(slot.id)" />
            </table-col>
          </table-row>
        </list-item>
      </c-table>
      <blankslate title="No slot yet" v-if="slots.length === 0">
        Add a slot to extract entities from text!
      </blankslate>
    </c-section>

    <c-section title="Training data">
      <btn inverse slot="actions" @click.prevent="createSample">Add a sample</btn>
      <c-table>
        <list-item tag="tbody">
          <table-row :scale="false" v-for="sample in intent.training" :key="sample.id">
            <table-col input :style="{ overflow: 'visible' }">
              <training-input
                :value="sample.text"
                @input="setSampleText(sample.id, $event)"
                @slotted="setSampleSlot(sample.id, $event)"
                :slots="intent.slots"
                :entities="sample.slots"
              />
            </table-col>
            <table-col action>
              <delete-btn @click.prevent="removeSample(sample.id)" />
            </table-col>
          </table-row>
        </list-item>
      </c-table>
      <blankslate title="No training data yet" v-if="intent.training.length === 0">
        Add training data to train your intent!
      </blankslate>
    </c-section>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import ListItem from './../animations/ListItem.vue';

import TrainingInput from './../components/TrainingInput.vue';
import CTable from './../components/Table.vue';
import TableCol from './../components/TableCol.vue';
import TableRow from './../components/TableRow.vue';
import Pagebar from './../components/Pagebar.vue';
import DeleteBtn from './../components/DeleteBtn.vue';
import Btn from './../components/Btn.vue';
import CSection from './../components/Section.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';

export default {
  name: 'Intent',
  components: {
    Blankslate, CSection, Btn, Pagebar, Modal, Textinput,
    CTable, TableCol, TableRow, ListItem, DeleteBtn, TrainingInput,
  },
  data() {
    return {
      intentModal: false,
      data: {},
      ids: {
        skillID: this.$route.params.skillID,
        intentID: this.$route.params.id,
      },
    };
  },
  computed: {
    intent() {
      return this.$store.getters.intent(this.$route.params.skillID)(this.$route.params.id);
    },
    slots() {
      return Object.values(this.intent.slots);
    },
    skill() {
      return this.$store.getters.skill(this.$route.params.skillID);
    },
    entities() {
      return this.$store.getters.entities;
    },
  },
  methods: {
    edit() {
      this.data = { ...this.intent };
      this.intentModal = true;
    },
    async setSlotEntity(id, entity) {
      await this.$store.dispatch(actions.upsertSlot.name, {
        id,
        entity,
        ...this.ids,
      });
    },
    async setSlotName(id, name) {
      await this.$store.dispatch(actions.upsertSlot.name, {
        id,
        name,
        ...this.ids,
      });
    },
    async setSampleText(id, text) {
      await this.$store.dispatch(actions.upsertSample.name, {
        id,
        text,
        ...this.ids,
      });
    },
    async setSampleSlot(id, slot) {
      await this.$store.dispatch(actions.upsertSample.name, {
        id,
        slot,
        ...this.ids,
      });
    },
    async createSlot() {
      await this.$store.dispatch(actions.upsertSlot.name, this.ids);
    },
    async removeSlot(id) {
      await this.$store.dispatch(actions.removeSlot.name, {
        id,
        ...this.ids,
      });
    },
    async createSample() {
      await this.$store.dispatch(actions.upsertSample.name, this.ids);
    },
    async removeSample(id) {
      await this.$store.dispatch(actions.removeSample.name, {
        id,
        ...this.ids,
      });
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

<style lang="scss">
@import "./../_vars.scss";

.intent {
  &__table {
    .table-col--input,
    .table-col--color {
      border-right: 1px solid color(divider);
    }

    .table-col--color {
      width: 0;

      & > * {
        border-radius: 25px;
        height: 16px;
        width: 16px;
      }
    }

    input,
    select {
      @include type(small);
      border: none;
      color: color(text, 1);
      outline: none;
      padding: baseline(0.25) baseline(0.5);
      width: 100%;
    }
  }
}
</style>
