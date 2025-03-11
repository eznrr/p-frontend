<template>
    <div class="recipe-card">
      <img :src="'data:image/jpg;base64,' + recipe.image_url" alt="Recipe Image" class="recipe-image" />
      <div class="recipe-info">
        <h2>{{ recipe.title }}</h2>
        <div class="recipe-details">
          <p><i class="gg-time"></i>{{ recipe.prep_time }}</p>
          <p><i class="gg-user"></i>{{ recipe.servings }}</p>
          <p><i class="gg-bowl"></i>{{ recipe.difficulty }}</p>
        </div>
        <div class="recipe-createdby">
          <p>Criado por: </p>
          <a class="link-profile" @click="goToProfile">{{ recipe.created_by }}</a>
        </div>
      </div>
      <div class="recipe-actions">
        <button class="btn-goToRecipe" @click="goToRecipe">Ver receita</button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToRecipe() {
      this.$router.push(`/recipes/${this.recipe.id}`);
    },
    goToProfile() {
      this.$router.push(`/${this.recipe.created_by}`);
    }
  },
};
</script>

<style scoped>
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/heart.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/share.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/time.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/user.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/bowl.css');

p{
  font-weight: bold;
  text-transform: uppercase;
  color: #404040;
}

.recipe-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  overflow: hidden;
  width: 400px;
  height: 350px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.recipe-card:hover{
  transform: scale(1.01);
}

.recipe-image {
  background-color: black;
  width: 100%;
  height: 64%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.recipe-info {
  width: 90%;
  height: 24%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
}

.recipe-info h2{
  font-family: monospace;
  text-transform: uppercase;
  font-weight: bold;
  color: #404040;
}

.recipe-details{
  font-family: monospace;
  font-weight: bold;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.recipe-details p{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.recipe-createdby{
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}

.recipe-createdby a{
  cursor: pointer;
  color: #787878;
}

.recipe-createdby a:hover{
  color: #404040;
}

.recipe-actions {
  width: 90%;
  height: 12%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.btn-goToRecipe {
  width: 30%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #626081;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-goToRecipe:hover {
  background-color: #33324e;
}
</style>
