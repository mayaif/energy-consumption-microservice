<script setup lang="ts">
import { ref } from "vue"
import ChartEnergyConsumption from '../charts/ChartEnergyConsumption.vue';
import FormItem from '../forms/FormItem.vue';

//Shared state for chart data
const chartData = ref({
    labels: ['20.03.2024', '26.04.204', '26.05.2024'],
    datasets: [
        {
            label: 'consumption',
            data: [40, 20, 12], borderColor: 'rgba(29, 78, 216, 1)',
            backgroundColor: 'rgba(29, 78, 216, 0.2)',
            borderWidth: 2,
            fill: true,
        }]
})

const addDataToChart = (date: string, consumption: number) => {
    chartData.value = {
        labels: [...chartData.value.labels, date],
        datasets: [
            {
                ...chartData.value.datasets[0],
                data: [...chartData.value.datasets[0].data, consumption]
            }
        ]
    }
}
</script>

<template>
    <div class="container mx-auto p-10 min-h-screen w-full flex flex-col md:justify-center items-center">
        <h1 class="my-10 font-bold text-4xl">Energy Market Trends</h1>
        <FormItem @submit-data="addDataToChart" />
        <ChartEnergyConsumption :chartData="chartData" />
    </div>
</template>