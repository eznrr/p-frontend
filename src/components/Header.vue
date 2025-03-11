<template>
  <header>
    <router-link to="/"><img class="logo" src="/public/logo.png" alt="Culinario Logo"></router-link>
    <SearchBar />
    <nav class="login-nav">
      <img src="/src/components/icons/icone-user.png" alt="Icone Usuario">
      <button v-if="isLoggedIn" class="login-nav-btn" @click="toggleDropdown">MENU<i class="gg-menu-boxed"></i></button>
      <div v-if="isLoggedIn && showDropdown" class="dropdown-menu">
        <button @click="goToProfile">Perfil</button>
        <button @click="goToCreateRecipe">Criar Receita</button>
        <button @click="logout" class="btn-logout">Sair</button>
      </div>
      <button v-if="!isLoggedIn" class="login-nav-btn" @click="goToLogin">Login</button>
    </nav>
  </header>
</template>


<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar
  },
  data() {
    return {
      showDropdown: false
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    goToProfile() {
      this.$router.push('/auth/profile');
      this.showDropdown = false;
    },
    goToCreateRecipe() {
      this.$router.push('/auth/create');
      this.showDropdown = false;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
      this.showDropdown = false;
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/search.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/menu-boxed.css');

header {
  width: 100vw;
  height: 80px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
}

.logo-link {
  height: 80px;
}

.logo {
  width: 80px;
}

.main-nav {
  display: flex;
  gap: 6vw;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-decoration: none;
  color: #33324e;
  font-weight: bold;
}

.main-nav a {
  text-decoration: none;
  color: #33324e;
  font-family: monospace;
  text-transform: uppercase;
}

.login-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  position: relative;
}

.login-nav-btn {
  padding: 5px;
  color: #33324e;
  border: 2px solid #33324e;
  border-radius: 5px;
  background-color: transparent;
  font-weight: bold;
  font-family: monospace;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.login-nav-btn:hover {
  background-color: #33324e;
  color: white;
}

.login-nav img {
  width: 25px;
}

.dropdown-menu {
  position: absolute;
  top: 35px;
  right: 0;
  background-color: white;
  border: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.dropdown-menu button {
  color: #33324e;
  font-family: monospace;
  text-transform: uppercase;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #33324e;
  color: white;
}

.dropdown-menu .btn-logout:hover {
  background-color:#d92929;
  color: white;
}

@media screen and (max-width: 900px) {
  .search-bar {
    width: 250px;
  }
}
</style>

