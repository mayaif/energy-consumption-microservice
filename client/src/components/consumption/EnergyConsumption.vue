<script setup lang="ts">
import { onMounted, computed } from "vue"
import { useEnergyStore } from "@/stores/energyStore";
import ChartEnergyConsumption from '../charts/ChartEnergyConsumption.vue';
import FormItem from '../forms/FormItem.vue';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-vue-next';

const energyStore = useEnergyStore()

const chartData = computed(() => ({
    labels: energyStore.energyData.map(entry => entry.date),
    datasets: [
        {
            label: 'consumption',
            data: energyStore.energyData.map(entry => entry.consumption),
            borderColor: 'rgba(29, 78, 216, 1)',
            backgroundColor: 'rgba(29, 78, 216, 0.2)',
            borderWidth: 2,
            filler: true,
        }
    ]
}))

const loading = computed(() => energyStore.loading)
const error = computed(() => energyStore.error);
const trend = computed(() => energyStore.trend)

const addData = async (date: string, consumption: number) => {
    await energyStore.addEnergyData(date, consumption)
    await energyStore.fetchTrendData()

}

onMounted(async () => {
    await energyStore.fetchEnergyData()
    await energyStore.fetchTrendData()
})
</script>

<template>
    <div class="container mx-auto p-10 min-h-screen w-full flex flex-col md:justify-center items-center">
        <h1 class="my-10 font-bold text-4xl">Energy Consumption Trends</h1>
        <FormItem @submit-data="addData" />
        <div v-if="loading" class="text-xl font bold text-blue-900 text-center">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="w-full md:max-w-5xl mx-auto">
            <div class="flex space-x-2 justify-center">
                <Activity class="text-blue-800" />
                <p class="font-bold text-center mb-8">Your energy consumption is:
                    <span :class="[trend === 'Increasing' ? 'text-red-700' : 'text-green-700']">{{ trend }}</span>
                </p>
                <ArrowUpRight v-if="trend === 'Increasing'" class="text-red-700" />
                <ArrowDownRight v-else class="text-green-700" />
            </div>
            <ChartEnergyConsumption :chartData="chartData" />
        </div>
    </div>
</template>