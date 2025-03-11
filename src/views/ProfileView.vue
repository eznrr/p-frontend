<template>
    <div class="profile-view">
      <Header />
      <ProfileDetails />
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import ProfileDetails from '../components/ProfileDetails.vue'
  
  export default {
    name: 'Home',
    components: {
      Header,
      ProfileDetails,
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
  