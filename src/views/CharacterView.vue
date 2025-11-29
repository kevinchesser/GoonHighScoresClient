<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { CharacterOverview } from '@/types/CharacterOverview';
import { getCharacterOverview } from '@/services/highScoresService';
import { Skill } from '@/enums/Skill';
import XpDropHistoryChart from '@/components/xpDropHistoryChart.vue';

const { name } = defineProps<{
	name : string
}>()

const chraracterOverview = ref<CharacterOverview>();

onMounted(async () => {
  chraracterOverview.value = await getCharacterOverview(name);
})

const getSkillName = (skillId: number) =>
{
	return Skill[skillId];
}

const getSkillIconPath = (skillId: number) =>
{
	return '/src/assets/skill_icon_' +  getSkillName(skillId)?.toLowerCase() + '.gif';
}

</script>

<template>
	<div class="container">
		<div class="column is-one-third">
			<h1 class="title">Stats for {{ name }}</h1>

			<div id="characterOverviewXpTable">
			<table class="table">
				<thead>
				<tr>
					<th>Skill</th>
					<th>Level</th>
					<th>Xp</th>
					<th>Rank</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="xpDrops, skillId in chraracterOverview?.xpDropsBySkill" :key="skillId">
					<td>
						<img :src="getSkillIconPath(skillId)"></img> {{ getSkillName(skillId) }}
					</td>
					<td>{{ xpDrops[0]?.level }}</td>
					<td>{{ xpDrops[0]?.xp.toLocaleString() }}</td>
					<td>{{ xpDrops[0]?.rank.toLocaleString() }}</td>
				</tr>
				</tbody>
				</table>
			</div>
		</div>
		<div class="column is-tow-thirds">
      		<!--<XpDropHistoryChartChart :labels="labels" :data="values" />-->
		</div>
	</div>

</template>

<style scoped></style>