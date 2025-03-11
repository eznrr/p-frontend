<template>
    <div class="edit">
      <Header />
      <EditRecipe />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import EditRecipe from '../components/EditRecipe.vue';
  
  export default {
    name: 'Edit',
    components: {
      Header,
      EditRecipe,
      Footer
    }
  };
  </script>
  
  <style>
    .edit{
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
  