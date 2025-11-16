<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Character } from '@/types/Character';

const characters = ref<Character[]>([]);

onMounted(async () => {
  const res = await fetch('https://localhost:7071/HighScore/characterNames')
  const data: Character[] = await res.json()
  characters.value = data
})
</script>

<template>
  <nav class="navbar navbar-expand-lg fixed-top bg-primary">
  <div class="container">
    <a class="navbar-brand" href="#">GoonHighScores</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home
            <span class="visually-hidden">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Graphs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-sm-2" type="search" placeholder="Search">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<div class="container">
  <div class="row">
    <div id="characters">
      <ul>
        <li v-for="character in characters" :key="character.name">
          {{ character.name }} and {{ character.discordUserId }}
        </li>
      </ul>
    </div>
  </div>
</div>

</template>

<style scoped>

</style>
