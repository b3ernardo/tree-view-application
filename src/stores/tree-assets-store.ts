import { create } from 'zustand'

type TreeAssetsState = {
  companyId: string
  companyName: string
  isEnergySensor: boolean
  isCritical: boolean
}

type TreeAssetsActions = {
  setCompanyId: (companyId: string) => void
  setCompanyName: (companyName: string) => void
  setIsEnergySensor: (isEnergySensor: boolean) => void
  setIsCritical: (isCritical: boolean) => void
}

export const useTreeAssetsStore = create<TreeAssetsState & TreeAssetsActions>(
  (set) => ({
    companyId: '',
    companyName: '',
    isEnergySensor: false,
    isCritical: false,
    setCompanyId: (companyId) => set({ companyId }),
    setCompanyName: (companyName) => set({ companyName }),
    setIsCritical: (isCritical) => set({ isCritical }),
    setIsEnergySensor: (isEnergySensor) => set({ isEnergySensor })
  })
)
