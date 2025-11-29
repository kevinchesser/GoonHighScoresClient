<script setup lang="ts">
import { computed } from 'vue';
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps<{
  labels: string[]
  data: number[]
}>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'XP Gained',
      data: props.data,
      borderWidth: 2,
      tension: 0.3,
      pointRadius: 5,
	  borderColor: '#4db8ff',  // bright blue line
      pointBackgroundColor: '#4db8ff',
      pointBorderColor: '#fff',
      pointHoverRadius: 7
    }
  ]
}))

/*
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
*/

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: '#ccc',     // X-axis label color
      },
      grid: {
        color: '#444',     // X-axis gridline color
      }
    },
    y: {
      ticks: {
        color: '#ccc',     // Y-axis label color
      },
      grid: {
        color: '#444',     // Y-axis gridline color
      },
      beginAtZero: true
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#fff'      // “XP Gained” text color
      }
    },
    tooltip: {
      titleColor: '#fff',
      bodyColor: '#fff',
      backgroundColor: '#333',
      borderColor: '#555',
      borderWidth: 1
    }
  }
}
</script>

<template>
  <div style="height: 400px;">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>