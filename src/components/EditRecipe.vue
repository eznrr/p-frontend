<template>
    <form @submit.prevent="submitForm" class="edit-form">
      <h1>Edite sua receita</h1>
      <h2>Sua receita</h2>
      <div class="edit-title-image">
        <div class="edit-title">
          <label for="title">Título da receita *</label>
          <input type="text" v-model="recipe.title" required>
        </div>
        <div class="edit-image">
          <img class="image-upload" v-if="!previewImage" :src="defaultImage" style="max-width: 400px; height: 224px;" />
          <img class="image-upload" v-if="previewImage" :src="previewImage" alt="Image Preview" style="max-width: 400px; height: 224px;" />
          <div class="edit-image-upload">
            <input type="file" @change="handleImageUpload" accept=".jpg,.jpeg,.png">
            <div>
              <p><strong>JPEG E JPG</strong> formatos aceitos</p>
              <p>Tamanho menor que <strong>10MB</strong></p>
              <p>Dimensões <strong>940x526px min</strong></p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="edit-info-ingredients">
        <div class="edit-info">
          <h2>Informações-chave</h2>
          <div class="edit-info-preptime">
            <label for="prep_time">Tempo de preparo (em minutos) *</label>
            <input type="number" v-model.number="recipe.prep_time" @input="validatePositiveNumber('prep_time')" required>
          </div>
          <div class="edit-info-servings">
            <label for="servings">Número de pessoas *</label>
            <input type="number" v-model.number="recipe.servings" @input="validatePositiveNumber('servings')" required>
          </div>
          <div class="edit-info-difficulty">
            <label for="difficulty">Dificuldade *</label>
            <select v-model="recipe.difficulty" required>
              <option value="Fácil">Fácil</option>
              <option value="Médio">Médio</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
        </div>
        <div class="edit-ingredients">
          <h2>Ingredientes</h2>
          <div class="edit-ingredients-input">
            <label for="ingredients">Ingredientes *</label>
            <div v-for="(ingredient, index) in recipe.ingredients" :key="index">
              <input type="text" v-model="recipe.ingredients[index]" required>
              <button class="button-remove" type="button" @click="removeIngredient(index)"><i class="gg-math-minus"></i></button>
            </div>
            <button class="button-add" type="button" @click="addIngredient"><i class="gg-math-plus"></i></button>
          </div>
        </div>
      </div>
  
      <div class="edit-instructions">
        <h2>Preparo</h2>
        <div class="edit-instructions-input">
          <label for="instructions">Instruções *</label>
          <div v-for="(instruction, index) in recipe.instructions" :key="index">
            <input type="text" v-model="recipe.instructions[index]" required>
            <button class="button-remove" type="button" @click="removeInstruction(index)"><i class="gg-math-minus"></i></button>
          </div>
          <button class="button-add" type="button" @click="addInstruction"><i class="gg-math-plus"></i></button>
        </div>
      </div>
  
      <button class="button-submit" type="submit">Salvar</button>
    </form>
  </template>
  
  <script>
  import authenticatedCreateRecipe from '@/api/autheticatedCreateRecipe';
  import publicApiClient from '@/api/publicClient';
  
  export default {
    props: {
      recipeId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        recipe: {
          title: '',
          image: null,
          ingredients: [''],
          instructions: [''],
          prep_time: '',
          servings: '',
          difficulty: ''
        },
        previewImage: null,
        defaultImage: ''
      };
    },
    created() {
      this.loadRecipeData();
    },
    methods: {
      async loadRecipeData() {
        try {
          const response = await publicApiClient.get(`/recipes/${this.$route.params.id}`);
          const { data } = response;
          this.recipe = {
            title: data.title,
            ingredients: data.ingredients,
            instructions: data.instructions,
            prep_time: data.prep_time,
            servings: data.servings,
            difficulty: data.difficulty,
            image: data.image_url ? `data:image/jpeg;base64,${data.image_url}` : null
          };
          this.defaultImage = this.recipe.image || '/public/imagem-padrao.png';
          this.previewImage = this.recipe.image;
        } catch (error) {
          console.error('Erro ao carregar a receita:', error);
        }
      },
      handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.recipe.image = e.target.result.split(',')[1];
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      addIngredient() {
        this.recipe.ingredients.push('');
      },
      removeIngredient(index) {
        this.recipe.ingredients.splice(index, 1);
      },
      addInstruction() {
        this.recipe.instructions.push('');
      },
      removeInstruction(index) {
        this.recipe.instructions.splice(index, 1);
      },
      validatePositiveNumber(field) {
        if (this.recipe[field] < 0) {
          this.recipe[field] = '';
        }
      },
      async submitForm() {
        try {
          const formData = new FormData();
          formData.append('title', this.recipe.title);
          if (this.recipe.image) {
            formData.append('image', this.recipe.image);
          }
          formData.append('ingredients', JSON.stringify(this.recipe.ingredients));
          formData.append('instructions', JSON.stringify(this.recipe.instructions));
          formData.append('prep_time', this.recipe.prep_time);
          formData.append('servings', this.recipe.servings);
          formData.append('difficulty', this.recipe.difficulty);
  
          await authenticatedCreateRecipe.put(`/auth/edit/${this.$route.params.id}`, formData);
  
          this.$router.push('/auth/profile');
        } catch (error) {
          console.error('Erro ao salvar a receita:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  @import url('https://unpkg.com/css.gg@2.0.0/icons/css/math-plus.css');
  @import url('https://unpkg.com/css.gg@2.0.0/icons/css/math-minus.css');
  
  h1{
    color: #333333;
    font-family: monospace;
    text-transform: uppercase;
    font-size: 2.5em;
    font-weight: bold;
    margin-bottom: 30px;
  }

  h2{
    color: #33324e;
    font-family: monospace;
    font-size: 1.8em;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  p{
    color: #33324e;
    font-family: monospace;
    font-size: 0.9em;
  }

  strong{
    color: #222222;
    font-weight: 700;
  }

  label{
    color: #333333;
    font-family: monospace;
    font-size: 1.3em;
    text-transform: uppercase;
    font-weight: bold;
    margin-bottom: 7px;
  }

  input{
    padding: 10px;
    width: 100%;
    height: 40px;
    background: white;
    border: 2px solid #33324e;
    border-radius: 5px;
    font-size: 1rem;
    color: #33324e;
  }

  input:focus {
    outline: transparent;
  } 

  select{
    padding: 10px;
    width: 100%;
    height: 40px;
    background: white;
    border: 2px solid #33324e;
    border-radius: 5px;
    font-size: 1rem;
    color: #33324e;
  }

  .button-remove, .button-add{
    background-color: #33324e;
    color: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    width: 30px;
    height: 30px;
    margin-top: 5px
  }

  .button-remove:hover {
    background-color: #d92929;
  }

  .button-add:hover {
    background-color: #2a7320;
  }

  .button-submit{
    background-color: #33324e;
    color: white;
    text-transform: uppercase;
    font-size: 1em;
    font-weight: bold;
    font-family: monospace;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    width: 80px;
    height: 30px;
    margin-top: 5px
  }

  .button-submit:hover{
    background-color: #2a7320;
  }

  .edit-form{
    background-color: white;
    padding: 50px;
    width: 1000px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .edit-title-image{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
  }

  .edit-title{
    display: flex;
    flex-direction: column;
  }

  .edit-image{
    display: flex;
    flex-direction: row;
    padding-left: 10px;
    gap: 20px;
  }

  .image-upload{
    border-radius: 5px;
    border: 2px solid #33324e;
  }

  .edit-image-upload{
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-around;
  }

  .edit-info-ingredients{
    display: flex;
    flex-direction: row;
    gap: 6%;    
    margin-bottom: 30px;
  }
  
  .edit-info{
    width: 47%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .edit-info-preptime, .edit-info-servings, .edit-info-difficulty, .edit-ingredients-input, .edit-instructions-input{
    display: flex;
    flex-direction: column;
  }

  .edit-ingredients{
    width: 47%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }

  .edit-instructions{
    margin-bottom: 30px;
  }

  @media screen and (max-width: 1100px) {
    .edit-form{
      width: 90%;
      padding: 50px 20px;
    }
    .edit-info-ingredients{
      flex-direction: column;
    }

    .edit-info{
      width: 100%;
      margin-bottom: 30px;
    }

    .edit-ingredients{
      width: 100%;
    }
  }

  @media screen and (max-width: 800px) {
    h1{
      font-size: 2em;
    }

    h2{
      font-size: 1.4em;
    }

    label{
      font-size: 1em;
    }

    .edit-image{
      flex-direction: column;
    }
  }
  </style>
  