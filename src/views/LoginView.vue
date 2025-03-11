<template>
  <div class="login-view">
    <DynamicFormLogin
      :form-title="'Login'"
      :inputs="fields"
      :submit-url="'http://localhost:8080/login'"
      @formSubmitted="handleFormSubmission"
    />
  </div>
</template>

<script>
import DynamicFormLogin from '../components/DynamicFormLogin.vue';

export default {
  components: {
    DynamicFormLogin
  },
  data() {
    return {
      fields: [
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
          errorMessage: 'Senha deve ter no mínimo 8 caracteres!',
          required: true
        },
      ]
    };
  },
  methods: {
    handleFormSubmission(data) {
      console.log('Login is successful:', data);
    }
  }
};
</script>

<style scoped>
.login-view{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
