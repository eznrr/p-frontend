<template>
  <div class="home">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Main from '../components/Main.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Main,
    Footer
  }
};
</script>

<style>
  .home{
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
</style>
