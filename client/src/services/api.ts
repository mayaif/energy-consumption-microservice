import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

export const addEnergyConsumption = async (date: string, consumption: number) => {
  const response = await axios.post(`${API_URL}/energy`, { date, consumption })
  return response.data
}

export const getEnergyConsumption = async () => {
  const response = await axios.get(`${API_URL}/energy`)
  return response.data
}

export const getEnergyTrend = async () => {
  const response = await axios.get(`${API_URL}/energy/trend`)
  return response.data
}
