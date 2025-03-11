<template>
    <div class="profile-view">
      <Header />
      <MyProfileDetails />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import MyProfileDetails from '../components/MyProfileDetails.vue'
  
  export default {
    name: 'Home',
    components: {
      Header,
      MyProfileDetails,
      Footer
    }
  };
  </script>
  
  <style>
    .profile-view{
      width: 100vw;
      min-height: 100vh;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
    }
  </style>
  