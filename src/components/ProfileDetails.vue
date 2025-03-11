<template>
  <div class="profile">
    <div class="profile-data">
      <img :src="'data:image/jpeg;base64,' + user.profile_image" alt="Foto de perfil do usuario" class="img-profile">
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
    </div>
    <h2 class="profile-subtitle">Receitas Postadas</h2>
    <div class="profile-recipes-grid">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>
  
  <script>
  import publicApiClient from '@/api/publicClient';
  import RecipeCard from '@/components/RecipeCard.vue';

  export default {
    name: 'Profile',
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
        recipes: []
      };
    },
    created() {
      this.fetchUserProfile();
      this.fetchRecipes();
    },
    methods: {
      async fetchUserProfile() {
        try {
          const response = await publicApiClient.get(`/${this.$route.params.username}`);
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
      }
    }
  };
  </script>

<style scoped>
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/calendar-dates.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/user.css');

.profile{
  margin: 50px 0 50px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.profile-data{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 30px;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
}

.img-profile{ 
  width: 200px;
  height: 200px;
  background-color: black;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.profile-name{
  font-family: monospace;
  color: #33324e;
  font-size: 3rem;
  text-transform: uppercase;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.11);
}

.profile-info{
  margin: 10px 0 10px 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 5px;
  color: white;
  font-family: monospace;
  font-size: 1.2em;
}

.profile-info p{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.info-icon{
  color: #7674a5;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.profile-subtitle{
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
  margin-bottom: 30px
}

@media screen and (max-width: 1800px) {
  .profile{
    width: 60%;
  }

  .profile-name{
    font-size: 2.2rem;
  }

  .profile-recipes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1400px) {
  .profile{
    width: 80%;
  }
}

@media screen and (max-width: 1050px) {
  .profile{
    width: 80%;
  }

  .profile-title{
    font-size: 2em;
  }

  .img-profile{
    width: 150px;
    height: 150px;
  }

  .profile-name{
    font-size: 1.5rem;
  }

  .profile-recipes-grid {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 1050px) {
    .profile{
      width: 95%;
    }
  } 
}
</style>
  