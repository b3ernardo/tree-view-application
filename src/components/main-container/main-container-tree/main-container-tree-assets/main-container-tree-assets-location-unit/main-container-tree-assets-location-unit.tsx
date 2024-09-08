import Image from 'next/image'
import { useState } from 'react'

import MainContainerTreeAssetsAssetUnit from '../main-container-tree-assets-asset-unit/main-container-tree-assets-asset-unit'
import MainContainerTreeAssetsComponentUnit from '../main-container-tree-assets-component-unit/main-container-tree-assets-component-unit'
import { ILocation, IAsset } from '@/types/tree-assets-types'

interface MainContainerTreeAssetsLocationUnitProps {
  assets: IAsset[]
  location: ILocation
  locations: ILocation[]
}

export default function MainContainerTreeAssetsLocationUnit({
  assets,
  location,
  locations
}: MainContainerTreeAssetsLocationUnitProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const subLocations = locations.filter((loc) => loc.parentId === location.id)
  const locationAssets = assets.filter(
    (asset) => asset.locationId === location.id && !asset.sensorType
  )
  const components = assets.filter(
    (asset) => asset.locationId === location.id && asset.sensorType
  )

  const hasSubLocations = subLocations.length > 0
  const hasAssets = locationAssets.length > 0
  const hasComponents = components.length > 0

  const toggleCollapse = () => {
    if (hasSubLocations || hasAssets || hasComponents) {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <div
        onClick={toggleCollapse}
        style={{
          alignItems: 'center',
          cursor: 'default',
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-start',
          padding: '4px'
        }}
      >
        {hasSubLocations || hasAssets || hasComponents ? (
          <Image
            alt={isCollapsed ? 'Expand' : 'Collapse'}
            height={7}
            src='/arrow-down.png'
            style={{
              cursor: 'pointer',
              transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s'
            }}
            width={12}
          />
        ) : null}
        <Image
          alt='Location icon'
          height={22}
          src='/location.png'
          width={16}
        />
        <div className='text-assets'>{location.name}</div>
      </div>
      {!isCollapsed && (
        <>
          {subLocations.map((subLoc) => (
            <MainContainerTreeAssetsLocationUnit
              assets={assets}
              key={subLoc.id}
              location={subLoc}
              locations={locations}
            />
          ))}
          {locationAssets.map((asset) => (
            <MainContainerTreeAssetsAssetUnit
              asset={asset}
              assets={assets}
              key={asset.id}
            />
          ))}
          {components.map((component) => (
            <MainContainerTreeAssetsComponentUnit
              component={component}
              key={component.id}
            />
          ))}
        </>
      )}
    </div>
  )
}
