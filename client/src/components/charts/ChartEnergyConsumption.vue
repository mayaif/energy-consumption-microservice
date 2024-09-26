<script setup lang="ts">
import { ref } from 'vue'
import type { ChartData } from 'chart.js';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const props = defineProps<{
    chartData: ChartData<'line', number[]>;
}>();
const chartOptions = ref({
    responsive: true
})
</script>

<template>
    <Line id="my-chart-id" :options="chartOptions" :data="props.chartData" class="mb-20" />
</template>
