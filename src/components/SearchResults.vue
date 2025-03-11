<template>
    <div class="search-results">
        <h1>Resultados da sua pesquisa</h1>
        <div class="recipes-grid">
            <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
        </div>

        <button v-if="isLoggedIn" @click="goToCreateRecipe">Poste sua própria receita<i class="gg-arrow-right-o"></i></button>
    </div>
</template>

<script>
import RecipeCard from '@/components/RecipeCard.vue';
import publicApiClient from '@/api/publicClient';

export default {
  name: 'SearchResults',
  components: {
    RecipeCard
  },
  data() {
    return {
      recipes: [],
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  created() {
    this.fetchRecipes();
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await publicApiClient.get(`/recipes/search/${this.$route.params.title}`);
        this.recipes = response.data;
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    },
    goToCreateRecipe() {
        this.$router.push('/auth/create');
    }
  },
};
</script>

<style scoped>
    .search-results{
        width: 87%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        margin: 50px 0 50px ;
    }

    .search-results h1{
        align-self: flex-start;
        width: 100%;
        text-transform: uppercase;
        font-weight: bold;
        font-family: monospace;
        font-size: 2.4em;
        color: white;
        padding: 0 0 30px;
        border-bottom: 1px solid white;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .recipes-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        justify-items: center;
    }

    button{
        text-transform: uppercase;
        font-family: monospace;
        font-weight: bold;
        font-size: 1.3em;
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

    button:hover{
        background-color: #252438;
    }

    @media screen and (max-width: 1720px) {
        .recipes-grid {
            grid-template-columns: repeat(3, 1fr);
        }

        .search-results h1{
            font-size: 2em;
        }
    }

    @media screen and (max-width: 1300px) {
        .recipes-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .search-results h1{
            font-size: 1.6em;
            width: 100%;
        }
    }

    @media screen and (max-width: 900px) {
        .recipes-grid {
            grid-template-columns: 1fr;
        }

        .search-results h1{
            font-size: 1.2em;
        }
    }
</style>
