<template> 
  <div class="recipe-view">
    <Header />
    <RecipeDetails />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import RecipeDetails from '../components/RecipeDetails.vue';

export default {
  name: 'RecipeView',
  components: {
    RecipeDetails,
    Header,
    Footer
  }
};
</script>

<style scoped>
  .recipe-view{
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }

  Header{
    position: relative;
    z-index: 1;
  }
</style>
