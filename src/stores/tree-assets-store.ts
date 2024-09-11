import { IAsset, ILocation } from '@/types/tree-assets-types'

import { create } from 'zustand'

type TreeAssetsState = {
  assetSearchString: string
  companyId: string
  companyName: string
  filteredAssets: IAsset[]
  filteredLocations: ILocation[]
  isCritical: boolean
  isEnergySensor: boolean
  selectedUnitId: string
}

type TreeAssetsActions = {
  setAssetSearchString: (assetSearchString: string) => void
  setCompanyId: (companyId: string) => void
  setCompanyName: (companyName: string) => void
  setFilteredAssets: (assets: IAsset[]) => void
  setFilteredLocations: (locations: ILocation[]) => void
  setIsCritical: (isCritical: boolean) => void
  setIsEnergySensor: (isEnergySensor: boolean) => void
  setSelectedUnitId: (selectedUnitId: string) => void
}

export const useTreeAssetsStore = create<TreeAssetsState & TreeAssetsActions>(
  (set) => ({
    assetSearchString: '',
    companyId: '',
    companyName: '',
    filteredAssets: [],
    filteredLocations: [],
    isCritical: false,
    isEnergySensor: false,
    selectedUnitId: '',
    setAssetSearchString: (assetSearchString) => set({ assetSearchString }),
    setCompanyId: (companyId) => set({ companyId }),
    setCompanyName: (companyName) => set({ companyName }),
    setFilteredAssets: (assets) => set({ filteredAssets: assets }),
    setFilteredLocations: (locations) => set({ filteredLocations: locations }),
    setIsCritical: (isCritical) => set({ isCritical }),
    setIsEnergySensor: (isEnergySensor) => set({ isEnergySensor }),
    setSelectedUnitId: (selectedUnitId) => set({ selectedUnitId })
  })
)
