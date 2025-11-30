<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { CharacterOverview } from '@/types/CharacterOverview';
import { getCharacterOverview } from '@/services/highScoresService';
import { Skill } from '@/enums/Skill';
import XpDropHistoryChart from '@/components/xpDropHistoryChart.vue';

const { name } = defineProps<{
	name : string
}>()

const chraracterOverview = ref<CharacterOverview>();

onMounted(async () => {
	loadCharacterOverview();
})

const route = useRoute();
watch(
	() => route.query,
	() => {
		loadCharacterOverview();
	},
	{ deep: true }
)

const loadCharacterOverview = async () => {
  chraracterOverview.value = await getCharacterOverview(name);
}

const getSkillName = (skillId: number) =>
{
	return Skill[skillId];
}

const skillIcons = import.meta.glob('@/assets/skill_icon_*.gif', { eager: true, query: 'url', import: 'default' }) as Record<string, string>;
const getSkillIconPath = (skillId: number) =>
{
	const skillName = getSkillName(skillId)?.toLowerCase();
    return skillIcons[`/src/assets/skill_icon_${skillName}.gif`];
}

const selectedSkillIndex = ref(0); //Default to overall
const selectedSkillName = computed(() => getSkillName(selectedSkillIndex.value));
const dateStringFormattingOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric"
};
const labels = computed(() =>
  chraracterOverview.value?.xpDropsBySkill[selectedSkillIndex.value]?.map(item => new Date(item.timeStamp).toLocaleDateString(undefined, dateStringFormattingOptions)).reverse() || []
)

const values = computed(() =>
  chraracterOverview.value?.xpDropsBySkill[selectedSkillIndex.value]?.map(item => item.xp).reverse() || []
)
</script>

<template>
	<div class="container">
		<div class="columns is-vcentered">
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
					<tr class="skillXpRow" v-for="xpDrops, skillId in chraracterOverview?.xpDropsBySkill" :key="skillId" @click="selectedSkillIndex = skillId">
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
			<div class="column is-tow-thirds is-align-items-center">
				<span class="title">{{ selectedSkillName }}</span>&nbsp;&nbsp;<img :src="getSkillIconPath(selectedSkillIndex)"></img>
				<XpDropHistoryChart :labels="labels" :data="values" :titleText="selectedSkillName ?? ''" />
			</div>
		</div>
	</div>

</template>

<style scoped>
	.skillXpRow:hover {
	background-color: var(--bulma-table-row-active-background-color);
	color: var(--bulma-table-row-active-color);
	}
</style>