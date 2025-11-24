<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getLast24hrLeaderboard } from '@/services/highScoresService';
import type { TimeSpanLeaderboard } from '@/types/TimeSpanLeaderboard';

const highScores = ref<TimeSpanLeaderboard>();

onMounted(async () => {
  highScores.value = await getLast24hrLeaderboard();
})
</script>

<template>

<div class="container">
  <div class="row">
    <div id="recentHighScoreTable" class="center col-md-5">
      <h3>Xp Gained in the Last 24hrs</h3>
      <table class="table">
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
            <td>{{ leaderBoardItem.timeSpanOverallXp }}</td>
          </tr>
        </tbody>
        </table>
    </div>
    <div id="graph" class="col-md-7">

    </div>
  </div>
</div>

</template>


