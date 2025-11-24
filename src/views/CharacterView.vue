<script setup lang="ts">
//import { onMounted } from 'vue';
//import type { Character } from '@/types/Character';
//import { getCharacters } from '@/services/characterService';
const { name } = defineProps<{
	name : string
}>()

//onMounted(async () => {
//})
</script>

<template>
	<div class="container">
	<div class="row">
		<h1>Stats for {{ name }}</h1>
	</div>
	</div>

</template>

<style scoped></style>