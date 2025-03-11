<template>
  <div class="profile">
    <h1 class="profile-title">Seu Perfil</h1>
    <div class="profile-data">
      <div class="profile-image">
        <img :src="'data:image/jpeg;base64,' + user.profile_image" alt="Foto de perfil do usuario" class="img-profile">
        <button @click="openImageUploadModal">Alterar</button>
      </div>
      <p class="profile-name">{{ user.name }}</p>
    </div>
    <div class="profile-info">
      <p>
        <div class="info-icon">
          <i class="gg-user"></i>
        </div>
        @{{ user.username }}
      </p>
      <p>
        <div class="info-icon">
          <i class="gg-calendar-dates"></i>
        </div>
        Entrou em {{ new Date(user.created_at).toLocaleDateString() }}
      </p>
      <button v-if="isLoggedIn" @click="goToCreate">Criar receita<i class="gg-arrow-right-o"></i></button>
    </div>
    <h2 class="profile-subtitle">Suas Receitas</h2>
    <div class="profile-recipes-grid">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>

    <div class="modal-overlay" v-if="showModal">
      <div class="modal">
        <h3>Alterar Foto de Perfil</h3>
        <input type="file" @change="onFileChange">
        <div class="modal-buttons">
          <button class="modal-buttons-save" v-if="selectedFile" @click="uploadProfileImage">Salvar</button>
          <button class="modal-buttons-cancel" @click="closeImageUploadModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authenticatedCreateRecipe from '@/api/autheticatedCreateRecipe';
import authenticatedApiClient from '@/api/authenticatedClient'
import publicApiClient from '@/api/publicClient'
import RecipeCard from '@/components/RecipeCard.vue';

export default {
  name: 'MyProfile',
  components: {
    RecipeCard
  },
  data() {
    return {
      user: {
        name: '',
        username: '',
        created_at: '',
        profile_image: ''
      },
      recipes: [],
      selectedFile: null,
      showModal: false
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  created() {
    this.fetchUserProfile();
    this.fetchRecipes();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await authenticatedApiClient.get('/auth/profile');
        this.user = response.data;
        this.currentUser = response.data.username;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    },
    async fetchRecipes() {
      try {
        const response = await publicApiClient.get('/recipes');
        this.recipes = response.data.filter(recipe => recipe.created_by === this.currentUser);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
    goToCreate() {
      this.$router.push('/auth/create');
    },
    openImageUploadModal() {
      this.showModal = true;
    },
    closeImageUploadModal() {
      this.showModal = false;
      location.reload(); 
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadProfileImage() {
      const formData = new FormData();
      formData.append('profile_image', this.selectedFile);

      try {
        await authenticatedCreateRecipe.post('/auth/profile/image', formData);
        this.fetchUserProfile();
        this.closeImageUploadModal();
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  }
};
</script>

<style scoped>
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/calendar-dates.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/user.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/arrow-right-o.css');

.profile {
  margin: 50px 0;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.profile-title {
  color: white;
  font-family: monospace;
  font-size: 2.6em;
  font-weight: bold;
  text-transform: uppercase;
}

.profile-data {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 30px;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
}

.profile-image {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.profile-image button {
  text-transform: uppercase;
  font-family: monospace;
  font-weight: bold;
  font-size: 0.7em;
  padding: 3px;
  border: none;
  border-radius: 5px;
  background-color: #33324e;
  color: white;
  cursor: pointer;
}

.img-profile {
  width: 200px;
  height: 200px;
  background-color: black;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.profile-name {
  font-family: monospace;
  color: #33324e;
  font-size: 3rem;
  text-transform: uppercase;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.11);
}

.profile-info {
  margin: 10px 0 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 5px;
  color: white;
  font-family: monospace;
  font-size: 1.2em;
}

.profile-info p {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.profile-info button {
  width: 250px;
  text-transform: uppercase;
  font-family: monospace;
  font-weight: bold;
  font-size: 1em;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #33324e;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.profile-info button:hover {
  background-color: #252438;
}

.info-icon {
  color: #7674a5;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.profile-subtitle {
  border-top: 1px solid white;
  padding: 20px 0 20px 10px;
  color: white;
  font-family: monospace;
  font-size: 2em;
  font-weight: bold;
  text-transform: uppercase;
}

.profile-recipes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: flex-start;
  align-items: center;
  margin-bottom: 30px;
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
  font-size: 1.5em;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-family: monospace;
}

.modal input {
  width: 100%;
  font-family: monospace;
  font-size: 0.8em;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background-color: #33324e;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-buttons-save{
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

.modal-buttons-save:hover {
  background-color: #2a7320;
}

.modal-buttons-cancel:hover {
  background-color: #d92929;
}


@media screen and (max-width: 1800px) {
  .profile {
    width: 60%;
  }

  .profile-name {
    font-size: 2.2rem;
  }

  .profile-recipes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1400px) {
  .profile {
    width: 80%;
  }

  .profile-info button {
    width: 170px;
    font-size: 0.7em;
  }
}

@media screen and (max-width: 1050px) {
  .profile {
    width: 80%;
  }

  .profile-title {
    font-size: 2em;
  }

  .img-profile {
    width: 150px;
    height: 150px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .profile-recipes-grid {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 1050px) {
  .profile {
    width: 95%;
  }
}

</style>
