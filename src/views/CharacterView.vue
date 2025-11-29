<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
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

const dateStringFormattingOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric"
};
const labels = computed(() =>
  chraracterOverview.value?.xpDropsBySkill[0]?.map(item => new Date(item.timeStamp).toLocaleDateString(undefined, dateStringFormattingOptions)).reverse() || []
)

const values = computed(() =>
  chraracterOverview.value?.xpDropsBySkill[0]?.map(item => item.xp).reverse() || []
)
</script>

<template>
	<div class="container">
		<div class="columns">
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
						<td>{{ xpDrops[0]?.xp?.toLocaleString() ?? "N/A" }}</td>
						<td>{{ xpDrops[0]?.rank?.toLocaleString() ?? "N/A" }}</td>
					</tr>
					</tbody>
					</table>
				</div>
			</div>
			<div class="column is-tow-thirds">
				<XpDropHistoryChart :labels="labels" :data="values" />
			</div>
		</div>
	</div>

</template>

<style scoped></style>