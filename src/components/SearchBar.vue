<template>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Pesquisar receitas" />
      <button @click="searchRecipes"><i class="gg-search"></i></button>
    </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    searchRecipes() {
      if (this.searchQuery.trim()) {
        this.$router.push(`/recipes/search/${encodeURIComponent(this.searchQuery)}`);
      }
    },
  },
};
</script>

<style scoped>
.search-bar {
  width: 450px;
  display: flex;
  justify-content: space-between;
  border: 2px solid #33324e;
  border-radius: 5px;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.25rem;
  color: grey;
}

.search-bar input:focus {
  outline: transparent;
}

.search-bar button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #33324e;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 0.5rem;
}

@media screen and (max-width: 900px) {
  .search-bar {
    width: 250px;
  }
}

@media screen and (max-width: 500px) {
  .search-bar {
    width: 180px;
  }
}
</style>