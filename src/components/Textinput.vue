<template>
  <div :class="{ 'textinput' : true, 'textinput--error': hasError }">
    <label :for="_uid" class="textinput__label">{{label}}</label>
    <input 
      v-if="multiple === false"
      type="text" 
      :name="name"
      :id="_uid" 
      class="textinput__input" 
      ref="input"
      :value="value" 
      @input="$emit('input', $event.target.value)" />
    <textarea v-else class="textinput__input textinput--multiple"
      :value="value" 
      :name="name"
      :rows="rows"
      :id="_uid"
      ref="textarea"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'Textinput',
  props: {
    err: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      required: false,
    },
    value: {},
    rows: {
      type: String,
      default: '5',
    },
    label: String,
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasError() {
      return this.err.length > 0;
    },
  },
  methods: {
    select() {
      if (this.multiple) {
        this.$refs.textarea.select();
      } else {
        this.$refs.input.select();
      }
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.textinput {
  & + * {
    margin-top: baseline();
  }

  &__label {
    @include type(small);
    display: block;
    font-weight: bold;
    padding-left: baseline(0.5);
    padding-bottom: baseline(0.25);
    transition: all 0.2s;
  }

  &__input {
    @include type(small);
    background-color: transparent;
    border: 2px solid color(divider);
    border-radius: 25px;
    font-family: inherit;
    outline: none;
    padding: baseline(0.25) baseline(0.5);
    width: 100%;
    transition: all 0.2s;

    &:focus {
      border-color: color(brand);
      box-shadow: 0 0 10px color(brand);
    }

    &:hover {
      border-color: color(brand);
    }
  }

  &--error {
    .textinput__label {
      color: color(danger);
    }

    .textinput__input {
      border-color: color(danger);
    }
  }
}
</style>

