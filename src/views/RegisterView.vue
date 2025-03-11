<template>
  <div class="register-view">
    <DynamicFormRegister
      :form-title="'Registrar'"
      :inputs="fields"
      :submit-url="'http://localhost:8080/register'"
      @formSubmitted="handleFormSubmission"
    />
  </div>
</template>

<script>
import DynamicFormRegister from '../components/DynamicFormRegister.vue';

export default {
  components: {
    DynamicFormRegister
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          type: 'text',
          placeholder: 'Nome',
          validator: value => value.length > 0,
          errorMessage: 'Por favor, insira um nome completo.',
          required: true
        },
        {
          key: 'username',
          type: 'text',
          placeholder: 'Username',
          validator: value => value.length > 0,
          errorMessage: 'Username ja existente.',
          required: true
        },
        {
          key: 'email',
          type: 'email',
          placeholder: 'E-mail',
          validator: value => /\S+@\S+\.\S+/.test(value),
          errorMessage: 'Por favor, insira um email valido!',
          required: true
        },
        {
          key: 'password',
          type: 'password',
          placeholder: 'Senha',
          validator: value => value.length >= 8,
          errorMessage: 'Senha deve ter no mínimo 8 caracteres.',
          required: true
        },
      ]
    };
  },
  methods: {
    handleFormSubmission(data) {
      console.log('Registration successful:', data);
    }
  }
};
</script>

<style scoped>
.register-view{
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
