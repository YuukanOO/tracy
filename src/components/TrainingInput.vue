<template>
  <div class="training-input">
    <div contenteditable ref="input" class="training-input__input" @keyup="emitInput" v-html="textHtml" @mouseup.stop="textSelected">
      
    </div>
    <transition name="popup">
      <div class="training-input__popup" ref="popup" v-if="popupVisible" :style="{ top: top + 'px', left: left + 'px' }">
        <button 
          @click.prevent="slotSelected(slot.id)" 
          class="training-input__button" 
          v-for="slot in availableSlots" 
          :key="slot.id"
          :style="{ color: slot.color }"
          >
          {{$getSlotName(slot)}}
        </button>
        <button 
          class="training-input__button"
          @click.prevent="slotSelected(null)">
          Remove
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TrainingInput',
  props: {
    value: String,
    slots: Object,
    entities: {
      type: Array,
      default: () => [],
    }
  },
  mounted() {
    this.globalClick = this.globalClick.bind(this);
    window.addEventListener('click', this.globalClick);
  },
  destroyed() {
    window.removeEventListener('click', this.globalClick);
  },
  data() {
  	return {
      text: this.value,
      current: {
        start: -1,
        end: -1,
        value: '',
      },
      top: 0,
      left: 0,
    };
  },
  computed: {
    availableSlots() {
      return Object.values(this.slots);
    },
    popupVisible() {
      return this.current.start !== -1 && this.current.end !== -1;
    },
  	textHtml() {
    	let text = '';
      let currentEntity = null;
      let currentSlot = null;

      // TODO: dynamic construction of vuejs components

    	for (let i = 0; i < this.text.length; ++i) {
        const entityIdx = this.entities.findIndex(o => o.start === i);
        const entity = this.entities[entityIdx];

        if (entity) {
          currentSlot = this.slots[entity.slot];
        	text += `<span class="training-input__slot" data-index="${entityIdx}" style="background-color: ${currentSlot.color}">`;
          
          currentEntity = entity;
        }
        
        if (currentEntity && currentEntity.end === i) {
          // text += `<span class="training-input__slot-name">${currentSlot.name}</span></span>`;
          text += '</span>';
          currentEntity = null;
          currentSlot = null;
        }
        
        text += this.text[i];
      }
      
    	return text;
    },
  },
  methods: {
    getSelectionOffsetFrom (parent) {
      const sel = window.getSelection();
      const length = sel.focusOffset - sel.anchorOffset;
      
      let current = sel.anchorNode;
      let offset = sel.anchorOffset;

      while(current && current !== parent) {
        var sibling = current;

        while(sibling = sibling.previousSibling) {
          if(sibling.nodeType === 3) {
            offset += sibling.nodeValue.length;
          } else if(sibling.nodeType === 1) {
            offset += this.getContentLength(sibling);
          }
        }

        current = current.parentNode;
      }

      if(!current) {
        return null;
      }
      
      const supposedStart = offset;
      const supposedEnd = offset + length;

      return { start: Math.min(supposedStart, supposedEnd), end: Math.max(supposedStart, supposedEnd) };
    },
    getContentLength(element) {
      var stack = [element];
      var total = 0;
      var current;

      while(current = stack.pop()) {
        for(var i = 0; i < current.childNodes.length; i++) {
          if(current.childNodes[i].nodeType === 1) {
              stack.push(current.childNodes[i]);
          } else if(current.childNodes[i].nodeType === 3) {
              total += current.childNodes[i].nodeValue.length;
          }
        }
      }

      return total;
    },
    resetCurrent() {
      this.current = { start: -1, end: -1, value: '' };
    },
    emitInput(evt) {
      if (evt.keyCode === 13) {
        this.$emit('enter', evt);
        evt.preventDefault();
      } else {
        this.$emit('input', this.$refs.input.innerText.trim());
      }
    },
    globalClick(e) {
      // TODO: some fixes

      if (e.target.parentElement === this.$refs.input && e.target.className === 'training-input__slot') {
        const idx = e.target.getAttribute('data-index');
        const entity = this.entities[idx];

        this.current = { ...entity };
        
        return;
      }

      if (e.target.parentElement !== this.$refs.popup && e.target !== this.$refs.input) {
        this.resetCurrent();
      }
    },
  	textSelected(evt) {
      this.left = evt.clientX + window.scrollX;
      this.top = evt.clientY + window.scrollY;

      this.text = this.$refs.input.innerText.trim();
      this.resetCurrent();
    
    	const { start, end } = this.getSelectionOffsetFrom(this.$refs.input);
            
      if (start !== end) {
        this.current.start = start;
        this.current.end = end;
        this.current.value = this.text.substring(start, end);
      }
    },
    slotSelected(id) {
      this.$emit('slotted', {
        ...this.current,
        slot: id,
      });
      this.resetCurrent();
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.training-input {
  // position: relative;

  &__input {
    @include type(small);
    color: color(text, 1);
    outline: none;
    padding: baseline(0.25) baseline(0.5);
    min-height: baseline();
  }

  &__slot {
    border-radius: 25px;
    color: color(text-inverse);
    cursor: pointer;
    padding: 0 baseline(0.25);
  }

  // &__slot-name {
  //   @include type(tiny);
  //   color: color(text-inverse, 1);
  //   margin-left: 5px;
  //   vertical-align: top;
  // }

  &__popup {
    display: block;
    position: absolute;
    transition: all 0.2s;
    z-index: 10;

    &.popup-enter, 
    &.popup-leave-to {
      transform: scale(0);
    }
  }

  &__button {
    background-color: white;
    border: 2px solid color(divider);
    border-bottom-width: 0;
    color: color(text, 1);
    cursor: pointer;
    display: block;
    font-weight: bold;
    padding: baseline(0.5) baseline();
    transition: all 0.2s;
    width: 100%;

    &:first-child {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
    }

    &:last-child {
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
      border-bottom-width: 2px;
    }

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(1);
    }

    &:focus {
      box-shadow: 0 0 5px color(divider);
    }
  }
}
</style>

