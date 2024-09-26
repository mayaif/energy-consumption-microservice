import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addEnergyConsumption, getEnergyConsumption, getEnergyTrend } from '@/services/api'

export interface EnergyData {
  date: string
  consumption: number
}

export const useEnergyStore = defineStore('energy', () => {
  const energyData = ref<EnergyData[]>([])
  const trend = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchEnergyData = async () => {
    loading.value = true
    try {
      energyData.value = await getEnergyConsumption()
      error.value = null
    } catch (err) {
      error.value = 'Failed to fetch energy data'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  const addEnergyData = async (date: string, consumption: number) => {
    loading.value = true
    try {
      await addEnergyConsumption(date, consumption)
      await fetchEnergyData()
      error.value = null
    } catch (err) {
      error.value = 'Failed to add energy data'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  const fetchTrendData = async () => {
    loading.value = true
    try {
      const { trend: newTrend } = await getEnergyTrend()
      trend.value = newTrend
      error.value = null
    } catch (err) {
      error.value = 'Failed to add energy data'
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    energyData,
    trend,
    fetchEnergyData,
    addEnergyData,
    fetchTrendData,
    error
  }
})
