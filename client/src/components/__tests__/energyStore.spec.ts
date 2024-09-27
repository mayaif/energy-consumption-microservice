import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEnergyStore } from '@/stores/energyStore'
import * as api from '@/services/api'

vi.mock('@/services/api')

describe('useEnergyStore', () => {
  let store: ReturnType<typeof useEnergyStore> // Variable to hold the store instance
  // Runs before each test in this suite
  beforeEach(() => {
    setActivePinia(createPinia()) // Setting up a new Pinia instance for each test
    store = useEnergyStore()
    vi.clearAllMocks()
  })
  it('should fetch energy data', async () => {
    const mockEnergyData = [
      { id: 1, date: '20/03/24', consumption: '100' },
      { id: 2, date: '22/03/24', consumption: '50' }
    ]
    vi.spyOn(api, 'getEnergyConsumption').mockResolvedValue(mockEnergyData)
    await store.fetchEnergyData()
    expect(store.energyData.length).toBe(2)
    expect(store.energyData[0].date).toBe('20/03/24')
    expect(store.energyData[1].date).toBe('22/03/24')
  })
})
