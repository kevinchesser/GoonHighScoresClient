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
            <td>{{ leaderBoardItem.character?.name || 'Unknown' }}</td>
            <td>{{ leaderBoardItem.timeSpanOverallXp }}</td>
          </tr>
        </tbody>
    <!--    <li v-for="character in characters" :key="character.name">-->
      <!--
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
        -->
        </table>
    </div>
    <div id="graph" class="col-md-7">

    </div>
  </div>
</div>

</template>


