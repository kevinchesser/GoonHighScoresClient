<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getLast24hrLeaderboard } from '@/services/highScoresService';
import LeaderboardChart from '@/components/leaderboardChart.vue';
import type { TimeSpanLeaderboard } from '@/types/TimeSpanLeaderboard';

const highScores = ref<TimeSpanLeaderboard>();

onMounted(async () => {
  highScores.value = await getLast24hrLeaderboard();
})

const labels = computed(() =>
  highScores.value?.timeSpanLeaderboardItems.map(item => item.character.name).reverse() || []
)

const values = computed(() =>
  highScores.value?.timeSpanLeaderboardItems.map(item => item.timeSpanOverallXp).reverse() || []
)
</script>

<template>

<div class="container">
  <div class="row">
    <div class="block">
    <div id="recentHighScoreTable" class="center">
      <h3>Xp Gained in the Last 24hrs</h3>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Player</th>
            <th>Xp Gained</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(leaderBoardItem, index) in highScores?.timeSpanLeaderboardItems || []" :key="leaderBoardItem.character?.name ?? index">
            <th>{{ index + 1 }}</th>
            <td>
            <router-link tag="td" :to="{
              name: 'character',
              params: {
                name: leaderBoardItem.character?.name
              }
            }"    
            >
              <span>{{ leaderBoardItem.character?.name || 'Unknown' }}</span>
            </router-link>
            </td>
            <td>{{ leaderBoardItem.timeSpanOverallXp.toLocaleString() }}</td>
          </tr>
        </tbody>
        </table>
    </div>
    </div>

    <div id="graph">
      <LeaderboardChart :labels="labels" :data="values" />
    </div>
  </div>
</div>

</template>


