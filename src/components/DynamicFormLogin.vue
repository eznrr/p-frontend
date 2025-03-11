<template>
  <div class="form-container">
    
    <form  @submit.prevent="submitForm">
      <Title :title="formTitle"/>

      <div v-for="input in inputs" :key="input.key">
        <FormInput
          :key="input.key"
          v-model="formData[input.key]"
          :type="input.type"
          :placeholder="input.placeholder"
          :validator="input.validator"
          :errorMessage="input.errorMessage"
          :datalist="input.datalist"
          :listId="input.listId"
          :required="input.required"
          v-model:hasError="fieldHasErrors[input.key]"
          @input="validateField(input.key, formData[input.key])"
          @blur="validateField(input.key, formData[input.key])"
        />
        <span v-if="errors[input.key]" class="error-message">{{ errors[input.key] }}</span>
      </div>

      <button :disabled="isSubmitDisabled" type="submit" class="submit-button">Entrar</button>
      <p>Ainda nao possui uma conta? <a href="" @click="goToRegister">Criar conta</a></p>
    </form>
    <img src="/public/foto-receita.jpg" alt="Imagem de uma receita">
  </div>
</template>

<script>
import Title from './Title.vue';
import FormInput from './FormInput.vue';
import publicApiClient from '@/api/publicClient';

export default {
  components: {
    Title,
    FormInput
  },
  props: {
    formTitle: {
      type: String,
      required: true
    },
    inputs: {
      type: Array,
      required: true,
      default: () => []
    },
    submitUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: {},
      validFields: {},
      errors: {},
      fieldHasErrors: {},
      loading: false
    };
  },
  computed: {
    isFormValid() {
      return Object.values(this.validFields).every(isValid => isValid);
    },
    isSubmitDisabled() {
      return !this.isFormValid || this.loading;
    }
  },
  methods: {
    initializeFormData() {
      if (!Array.isArray(this.inputs)) {
        console.error('Inputs prop should be an array.');
        return;
      }
      this.inputs.forEach(input => {
          this.formData[input.key] = input.defaultValue || '';
          this.validFields[input.key] = !input.required;
          this.fieldHasErrors[input.key] = false;
      });
    },
    validateField(key, value) {
      const input = this.inputs.find(input => input.key === key);
      if (input && input.validator) {
        const isValid = input.validator(value);
        this.validFields[key] = isValid;
      }
    },
    async submitForm() {
        if (!this.isFormValid) {
          alert('Please correct the errors before submitting.');
          return;
        }

        try {
          const response = await publicApiClient.post(this.submitUrl, this.formData)
          
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$router.push({ name: 'Home' });
        } catch (error) {
          console.error('Error logging user:', error);
        }
      },
    goToRegister() {
      this.$router.push('/register');
    }
  },
  mounted() {
    this.initializeFormData();
  }
};
</script>


<style scoped>
.form-container {
  display: flex;
  flex-direction: row;
  width: 800px;
  height: 500px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form-container form{
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
}

.submit-button {
  background-color: #5d54ac;
  padding: 10px;
  width: 320px;
  height: 50px;
  border: none;
  text-transform: uppercase;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
  margin-bottom: 10px;
}

.submit-button:hover {
  background-color: #7674a5;
}

.submit-button:disabled {
  color: #fff;
  cursor: not-allowed;
  opacity: 60%;
  background-color: #33324e;
}

p{
  font-family: monospace;
  color: gray;
  font-size: 0.8em;
}

p a{
  color: #5d54ac;
}

</style>
