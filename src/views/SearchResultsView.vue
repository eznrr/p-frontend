<template>
    <div class="search-results">
      <Header />
      <SearchResults />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import SearchResults from '../components/SearchResults.vue';
  
  export default {
    name: 'SearchResultsView',
    components: {
      Header,
      SearchResults,
      Footer
    }
  };
  </script>
  
  <style>
    .search-results{
      width: 100vw;
      min-height: 100vh;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      align-items: center;
    }
  </style>
  