<template>
    <div class="create">
      <Header />
      <CreateRecipe />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import CreateRecipe from '../components/CreateRecipe.vue';
  
  export default {
    name: 'Create',
    components: {
      Header,
      CreateRecipe,
      Footer
    }
  };
  </script>
  
  <style>
    .create{
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
  