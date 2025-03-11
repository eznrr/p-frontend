<template>
    <footer>
      <img src="/src/components/icons/logo-simbolo.svg" alt="Logo Culinario">
      <p>&copy; 2024 Culinario</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  };
  </script>
  
  <style scoped>
    footer{
      width: 100vw;
      height: 50px;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
    }

    footer p{
      color: black;
    }

    img{
      width: 35px;
    }

  </style>
  