<template>
  <div class="input-group" :class="{ 'has-error': localHasError }">
    
    <input
      ref="inputElement"
      :type="type"
      :value="internalValue"
      :placeholder="placeholder"
      :required="required"
      :aria-invalid="localHasError"
      :list="listId"
      autocomplete="off"
      @input="updateValue($event.target.value)"
      @blur="handleBlur"
    >
    <datalist v-if="datalist && datalist.length > 0" :id="listId">
      <option v-for="item in datalist" :key="item.value" :value="item.value">{{ item.label }}</option>
    </datalist>

    <span class="error-message" :class="{ visible: localHasError }">{{ fullErrorMessage }}</span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [String, Number],
    placeholder: String,
    required: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    hasError: Boolean,
    errorMessage: {
      type: String,
      default: 'Invalid input'
    },
    validator: {
      type: Function,
      default: () => true
    },
    datalist: {
      type: Array,
      default: () => []
    },
    listId: {
      type: String,
      default: () => `list-${Math.random().toString(36).substring(2, 15)}`
    }
  },
  emits: ['update:modelValue', 'update:hasError'],
  data() {
    return {
      internalValue: this.modelValue,
      localHasError: this.hasError
    };
  },
  methods: {
    updateValue(value) {
      this.internalValue = value;
      this.$emit('update:modelValue', value);
    },
    handleBlur() {
      this.localHasError = !this.validator(this.internalValue) && this.internalValue.length > 0;
      this.$emit('update:hasError', this.localHasError);
    }
  },
  watch: {
    modelValue(newValue) {
      this.internalValue = newValue;
    },
    hasError(newValue) {
      this.localHasError = newValue;
    }
  },
  computed: {
    fullErrorMessage() {
      return this.errorMessage || 'Error';
    }
  }
}
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group input {
  padding: 10px;
  width: 320px;
  height: 50px;
  background: #f2f2f2;
  border: none;
  font-size: 1rem;
  color: gray;
}

.input-group input::placeholder {
  color: #33324e;
}

.input-group input:focus {
    outline: transparent;
}

.error-message {
  color: red;
  font-family: monospace;
  font-size: 0.7rem;
  opacity: 0; 
  transition: opacity 0.3s;
  position: 0 0 0;
}

.error-message.visible {
  opacity: 1;
}

.input-group.has-error input {
  border: 1px solid red;
}
</style>
