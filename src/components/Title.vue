<template>
  <div class="title-container">
    <img src="/public/logo.png" alt="Logo" class="logo"/>
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: String,
  }
}
</script>

<style>
.title-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo {
max-width: 100px;
}

.title {
  font-size: 1.3rem;
  font-family: monospace;
  font-weight: bold;
  text-transform: uppercase;
  color: #5d54ac;
}
</style>
