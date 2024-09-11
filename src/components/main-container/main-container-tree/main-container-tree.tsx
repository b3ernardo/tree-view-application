import { useEffect } from 'react'

import MainContainerTreeAssets from './main-container-tree-assets/main-container-tree-assets'
import MainContainerTreeSearchBox from './main-container-tree-search-box/main-container-tree-search-box'
import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { ILocation, IAsset } from '@/types/tree-assets-types'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function MainContainerTree() {
  const companyId = useTreeAssetsStore((state) => state.companyId)
  const setFilteredAssets = useTreeAssetsStore(
    (state) => state.setFilteredAssets
  )
  const setFilteredLocations = useTreeAssetsStore(
    (state) => state.setFilteredLocations
  )
  const isCritical = useTreeAssetsStore((state) => state.isCritical)
  const isEnergySensor = useTreeAssetsStore((state) => state.isEnergySensor)
  const assetSearchString = useTreeAssetsStore(
    (state) => state.assetSearchString
  )

  const filteredAssets = useTreeAssetsStore((state) => state.filteredAssets)
  const filteredLocations = useTreeAssetsStore(
    (state) => state.filteredLocations
  )

  const { data: locations, isPending: isPendingLocations } = useQuery<
    ILocation[]
  >({
    queryFn: async () => {
      const res = await axios.get(
        `https://fake-api.tractian.com/companies/${companyId}/locations`
      )
      return res.data
    },
    queryKey: ['companies', companyId, 'locations']
  })

  const { data: assets, isPending: isPendingAssets } = useQuery<IAsset[]>({
    queryFn: async () => {
      const res = await axios.get(
        `https://fake-api.tractian.com/companies/${companyId}/assets`
      )
      return res.data
    },
    queryKey: ['companies', companyId, 'assets']
  })

  useEffect(() => {
    if (assets && locations) {
      const filteredAssets = assets.filter((asset) => {
        const matchesSearch = asset.name
          .toLowerCase()
          .includes(assetSearchString.toLowerCase())
        const matchesCritical = !isCritical || asset.status === 'alert'
        const matchesEnergySensor =
          !isEnergySensor || asset.sensorType === 'energy'
        return matchesSearch && matchesCritical && matchesEnergySensor
      })

      const filteredLocations = locations

      const getParents = (id: string, assetsList: IAsset[]) => {
        const parents: Set<string> = new Set()
        let currentId = id
        while (currentId) {
          const parent = assetsList.find((a) => a.id === currentId)?.parentId
          if (parent) {
            parents.add(parent)
            currentId = parent
          } else {
            break
          }
        }
        return Array.from(parents)
      }

      const allFilteredAssets = new Set<IAsset>()
      filteredAssets.forEach((asset) => {
        allFilteredAssets.add(asset)
        const parents = getParents(asset.id, assets)
        parents.forEach((parentId) => {
          const parent = assets.find((a) => a.id === parentId)
          if (parent) {
            allFilteredAssets.add(parent)
          }
        })
      })

      setFilteredAssets(Array.from(allFilteredAssets))
      setFilteredLocations(filteredLocations)
    }
  }, [
    assets,
    locations,
    isCritical,
    isEnergySensor,
    assetSearchString,
    setFilteredAssets,
    setFilteredLocations
  ])

  return (
    <div
      style={{
        border: '1px solid #E3EAEF',
        display: 'flex',
        flexDirection: 'column',
        height: '95%'
      }}
    >
      <MainContainerTreeSearchBox />

      {(isPendingLocations || isPendingAssets) && (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center'
          }}
        >
          <div>Carregando dados...</div>
        </div>
      )}

      {locations && assets && (
        <MainContainerTreeAssets
          assets={filteredAssets}
          locations={filteredLocations}
        />
      )}
    </div>
  )
}
