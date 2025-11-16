<script setup lang="ts">
  import CharacterList from './components/characterList.vue'
</script>

<template>
  <!--Navbar-->

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
    <img src="./assets/had_to_do_it_to_em_wide.jpg"></img>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasic" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        Home
      </a>

      <a class="navbar-item">
        Graphs
      </a>
    </div>
  </div>
</nav>

  <CharacterList />
</template>

<style scoped>

</style>
