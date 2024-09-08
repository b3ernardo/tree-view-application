import { create } from 'zustand'

type TreeAssetsState = {
  assetSearchString: string
  companyId: string
  companyName: string
  isCritical: boolean
  isEnergySensor: boolean
  selectedUnitId: string
}

type TreeAssetsActions = {
  setAssetSearchString: (assetSearchString: string) => void
  setCompanyId: (companyId: string) => void
  setCompanyName: (companyName: string) => void
  setIsCritical: (isCritical: boolean) => void
  setIsEnergySensor: (isEnergySensor: boolean) => void
  setSelectedUnitId: (selectedUnitId: string) => void
}

export const useTreeAssetsStore = create<TreeAssetsState & TreeAssetsActions>(
  (set) => ({
    assetSearchString: '',
    companyId: '',
    companyName: '',
    isCritical: false,
    isEnergySensor: false,
    selectedUnitId: '',
    setAssetSearchString: (assetSearchString) => set({ assetSearchString }),
    setCompanyId: (companyId) => set({ companyId }),
    setCompanyName: (companyName) => set({ companyName }),
    setIsCritical: (isCritical) => set({ isCritical }),
    setIsEnergySensor: (isEnergySensor) => set({ isEnergySensor }),
    setSelectedUnitId: (selectedUnitId) => set({ selectedUnitId })
  })
)
