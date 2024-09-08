import MainContainerTreeAssets from './main-container-tree-assets/main-container-tree-assets'
import MainContainerTreeSearchBox from './main-container-tree-search-box/main-container-tree-search-box'
import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { ILocation, IAsset } from '@/types/tree-assets-types'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function MainContainerTree() {
  const companyId = useTreeAssetsStore((state) => state.companyId)

  const { data: locations } = useQuery<ILocation[]>({
    queryFn: async () => {
      const res = await axios.get(
        `https://fake-api.tractian.com/companies/${companyId}/locations`
      )
      return res.data
    },
    queryKey: ['companies', companyId, 'locations']
  })

  const { data: assets } = useQuery<IAsset[]>({
    queryFn: async () => {
      const res = await axios.get(
        `https://fake-api.tractian.com/companies/${companyId}/assets`
      )
      return res.data
    },
    queryKey: ['companies', companyId, 'assets']
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <MainContainerTreeSearchBox />
      {locations && assets && (
        <MainContainerTreeAssets
          assets={assets}
          locations={locations}
        />
      )}
    </div>
  )
}
