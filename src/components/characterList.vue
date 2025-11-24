<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Character } from '@/types/Character';
import { getCharacters } from '@/services/characterService';

const characters = ref<Character[]>([]);

onMounted(async () => {
  characters.value = await getCharacters();
})
</script>

<template>

<div class="container">
  <div class="row">
    <div id="characters" class="center col-md-8">
      <ul>
        <li v-for="character in characters" :key="character.name">
          <router-link :to="
            {
              name: 'character',
              params: {
                name: character.name
              }
            }"
          >
            {{ character.name }} and {{ character.discordUserId }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</div>

</template>


