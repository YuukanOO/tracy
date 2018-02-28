<template>
  <div class="training-input">
    <div contenteditable ref="input" class="training-input__input" @keyup="$emit('input', $refs.input.innerText)" @blur="resetCurrent" v-html="textHtml" @mouseup="textSelected">
      
    </div>
    <div class="training-input__popup" v-if="popupVisible" :style="{ left: left + 'px' }">
      <button class="training-input__button" v-for="slot in slots" :key="slot.id">
        {{slot.name}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainingInput',
  props: {
    value: String,
    slots: Array,
  },
  data() {
  	return {
      text: this.value,
      current: {
        start: -1,
        end: -1,
        value: '',
      },
      left: 0,
      entities: [],
    };
  },
  computed: {
    popupVisible() {
      return this.current.start !== -1 && this.current.end !== -1;
    },
  	textHtml() {
    	let text = '';
      let currentEntity = null;
      
    	for (let i = 0; i < this.text.length; ++i) {
      	let entity = this.entities.find(o => o.start === i);
        
        if (entity) {
        	text += '<span class="entity">';
          
          currentEntity = entity;
        }
        
        if (currentEntity && currentEntity.end === i) {
        	text += '</span>';
          currentEntity = null;
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
  	textSelected(evt) {
      this.left = evt.layerX;
      this.text = this.$refs.input.innerText;
      this.resetCurrent();
    
    	const { start, end } = this.getSelectionOffsetFrom(this.$el);
            
      if (start !== end) {
        this.current.start = start;
        this.current.end = end;
        this.current.value = this.text.substring(start, end);
      }
    }
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.training-input {
  position: relative;

  &__input {
    @include type(small);
    color: color(text, 1);
    padding: baseline(0.25) baseline(0.5);
    min-height: baseline();
  }

  &__popup {
    // border: 1px solid color(divider);
    // border-radius: 25px;
    // padding: baseline(0.5);
    position: absolute;
  }

  &__button {
    background-color: white;
    display: block;
    padding: baseline(0.5);
    width: 100%;
  }
}
</style>

