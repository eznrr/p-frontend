<template>
    <div class="recipe">
        <div class="recipe-header">
            <h1 class="recipe-title">{{ recipe.title }}</h1>
            <div class="recipe-buttons" v-if="isCurrentUserRecipeCreator">
                <button @click="goToEditRecipe" class="edit-button">Editar</button>
                <button class="delete-button" @click="openModal">Excluir</button>
            </div>
        </div>
        <img :src="'data:image/jpg;base64,' + recipe.image_url" alt="Recipe Image" class="recipe-image" />
        <div class="recipe-details">
          <p class="recipe-createdby">Criado por: <a @click="goToProfile">@{{ recipe.created_by }}</a></p>
          <div class="recipe-info">
            <p><i class="gg-time"></i>{{ recipe.prep_time }}</p>
            <p><i class="gg-user"></i>{{ recipe.servings }}</p>
            <p><i class="gg-bowl"></i>{{ recipe.difficulty }}</p>
          </div>
        </div>
        <div class="recipe-ingredients">
            <h2>Ingredientes</h2>
            <ul class="recipe-ingredients-list">
                <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
            </ul>
        </div>
        <div class="recipe-instructions">
            <h2>Modo de preparo</h2>
            <ul class="recipe-instructions-list">
                <li v-for="instruction in recipe.instructions" :key="instruction">{{ instruction }}</li>
            </ul>
        </div>
    </div>

    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <h3>Tem certeza que deseja excluir?</h3>
        <div class="modal-buttons">
          <button class="modal-buttons-delete" @click="deleteRecipe">Excluir</button>
          <button class="modal-buttons-cancel" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
</template>

<script>
import authenticatedApiClient from '@/api/authenticatedClient';
import publicApiClient from '@/api/publicClient';

export default {
    data() {
      return {
        recipe: {},
        currentUser: '',
        showModal: false
      };
    },
    methods: {
      async fetchRecipe() {
        try {
          const response = await publicApiClient.get(`/recipes/${this.$route.params.id}`);
          this.recipe = response.data;

          const userResponse = await authenticatedApiClient.get('/auth/profile');
          this.currentUser = userResponse.data.username;
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      },
      async deleteRecipe(){
        try {
          await authenticatedApiClient.delete(`/auth/delete/${this.recipe.id}`);
          this.closeModal();
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      },
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.$router.push({ name: 'MyProfile' });
      },
      goToEditRecipe() {
        this.$router.push(`/auth/edit/${this.recipe.id}`);
      },
      goToProfile() {
        this.$router.push(`/${this.recipe.created_by}`);
      }
    },
    computed: {
      isCurrentUserRecipeCreator() {
        return this.currentUser === this.recipe.created_by;
      }
    },
    created() {
      this.fetchRecipe();
    }
};
</script> 

<style scoped>
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/time.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/user.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/bowl.css');

.recipe {
    width: 70%;
    padding: 50px 30px;
    background-color: white;
}

.recipe-header{
    width: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.recipe-title {
    width: 50%;
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
    color: #33324e;
    font-size: 2.6em;
}

.recipe-buttons{
    display: flex;
    gap: 5px;
}

.edit-button{
    width: 50%;
    text-transform: uppercase;
    font-family: monospace;
    font-weight: bold;
    font-size: 0.8em;
    padding: 5px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    background-color: #33324e;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.delete-button{
    width: 50%;
    text-transform: uppercase;
    font-family: monospace;
    font-weight: bold;
    font-size: 0.8em;
    padding: 5px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    background-color: #33324e;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.edit-button:hover {
  background-color: #038cfc;
}

.delete-button:hover {
  background-color: #d92929;
}

.recipe-image {
    width: 70%;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.recipe-details {
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.recipe-createdby {
    font-family: monospace;
    font-weight: bold;
    color: #33324e;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
}

.recipe-createdby a{
  cursor: pointer;
  color: #787878;
}

.recipe-createdby a:hover{
  color: #404040;
}

.recipe-info{
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.recipe-info p{
  font-family: monospace;
  font-weight: bold;
  color: #33324e;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.recipe-ingredients {
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid #33324e;
}

.recipe-ingredients h2 {
    font-weight: bold;
    font-size: 2em;
    text-transform: uppercase;
    font-family: monospace;
    color: #33324e;
}

.recipe-ingredients-list {
    font-size: 1.4em;
    font-family: monospace;
    color: #33324e;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.recipe-instructions {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.recipe-instructions h2 {
    font-weight: bold;
    font-size: 2em;
    text-transform: uppercase;
    font-family: monospace;
    color: #33324e;
}

.recipe-instructions-list {
    font-size: 1.4em;
    font-family: monospace;
    color: #33324e;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
  height: 150px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal h3 {
  color: #33324e;
  margin-bottom: 10px;
  font-size: 1.3em;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-family: monospace;
}

.modal-buttons-delete{
  width: 20%;
  text-transform: uppercase;
  font-family: monospace;
  font-weight: bold;
  font-size: 0.8em;
  padding: 5px;
  margin-right: 5px;
  border: none;
  border-radius: 5px;
  background-color: #33324e;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-buttons-cancel{
  width: 20%;
  text-transform: uppercase;
  font-family: monospace;
  font-weight: bold;
  font-size: 0.8em;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #33324e;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-buttons-delete:hover {
  background-color: #d92929;
}

.modal-buttons-cancel:hover {
  background-color: #d92929;
}

@media screen and (max-width: 1600px) {
    .recipe-header{
      width: 100%;
    }

    .recipe-image {
        width: 100%;
    }

    .recipe-details{
      width: 100%;
    }
}

@media screen and (max-width: 1000px) {
    .recipe {
        width: 80%;
    }

    .recipe-title{
      font-size: 2.2em;
    }

    .recipe-createdby{
      gap: 2px;
    }

    .recipe-info{
      width: 50%;
    }

    .recipe-ingredients h2 {
        font-size: 1.6em;
    }

    .recipe-ingredients-list {
        font-size: 1.2em;
    }

    .recipe-instructions h2 {
        font-size: 1.6em;
    }

    .recipe-instructions-list {
        font-size: 1.2em;
    }
}

@media screen and (max-width: 600px) {
    .recipe {
        width: 90%;
    }

    .recipe-title{
      font-size: 1.8em;
    }

    .recipe-details {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    .recipe-info{
      width: 100%;
    }

    .recipe-ingredients h2 {
        font-size: 1.3em;
    }

    .recipe-ingredients-list {
        font-size: 1em;
    }

    .recipe-instructions h2 {
        font-size: 1.3em;
    }

    .recipe-instructions-list {
        font-size: 1em;
    }
}
</style>
