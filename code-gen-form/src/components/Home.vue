
<template>
  <div class="logo">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1>
    code-gen-form
  </h1>
  <h3>
    拒绝以后所有的简单的增删改查
  </h3>
</template>
<script setup lang="ts">
</script>
<style scoped>
  .logo{
    padding-top: 50px;
    text-align: center;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  h1, h3{
    padding-top: 20px;
    text-align: center;
  }
</style>
