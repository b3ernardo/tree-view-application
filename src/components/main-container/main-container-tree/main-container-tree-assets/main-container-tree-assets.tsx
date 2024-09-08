import MainContainerTreeAssetsComponentUnit from './main-container-tree-assets-component-unit/main-container-tree-assets-component-unit'
import MainContainerTreeAssetsLocationUnit from './main-container-tree-assets-location-unit/main-container-tree-assets-location-unit'
import { ILocation, IAsset } from '@/types/tree-assets-types'

interface MainContainerTreeAssetsProps {
  assets: IAsset[]
  locations: ILocation[]
}

export default function MainContainerTreeAssets({
  assets,
  locations
}: MainContainerTreeAssetsProps) {
  const rootLocations = locations.filter((loc) => !loc.parentId)

  const unlinkedComponents = assets.filter(
    (asset) => !asset.locationId && !asset.parentId && asset.sensorType
  )

  return (
    <div
      style={{
        height: '70vh',
        overflowY: 'auto',
        paddingTop: '8px'
      }}
    >
      {rootLocations.map((location) => (
        <MainContainerTreeAssetsLocationUnit
          assets={assets}
          key={location.id}
          location={location}
          locations={locations}
        />
      ))}
      {unlinkedComponents.map((component) => (
        <MainContainerTreeAssetsComponentUnit
          component={component}
          key={component.id}
        />
      ))}
    </div>
  )
}
