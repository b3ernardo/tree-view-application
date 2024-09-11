import Image from 'next/image'
import { useState, useMemo, useCallback } from 'react'
import React from 'react'

import MainContainerTreeAssetsAssetUnit from '../main-container-tree-assets-asset-unit/main-container-tree-assets-asset-unit'
import MainContainerTreeAssetsComponentUnit from '../main-container-tree-assets-component-unit/main-container-tree-assets-component-unit'
import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { ILocation, IAsset } from '@/types/tree-assets-types'

interface MainContainerTreeAssetsLocationUnitProps {
  assets: IAsset[]
  location: ILocation
  locations: ILocation[]
}

function MainContainerTreeAssetsLocationUnit({
  assets,
  location,
  locations
}: MainContainerTreeAssetsLocationUnitProps) {
  const isCritical = useTreeAssetsStore((state) => state.isCritical)
  const isEnergySensor = useTreeAssetsStore((state) => state.isEnergySensor)
  const assetSearchString = useTreeAssetsStore(
    (state) => state.assetSearchString
  )
  const [isCollapsed, setIsCollapsed] = useState(true)

  const locationAssets = useMemo(() => {
    return assets.filter(
      (asset) => asset.locationId === location.id && !asset.sensorType
    )
  }, [assets, location.id])

  const components = useMemo(() => {
    return assets.filter(
      (asset) => asset.locationId === location.id && asset.sensorType
    )
  }, [assets, location.id])

  const getRelevantSubLocations = useCallback(
    (locId: string): ILocation[] => {
      const subLocs = locations.filter((subLoc) => subLoc.parentId === locId)
      const relevantSubLocs = subLocs.filter((subLoc) => {
        const hasRelevantAssets = assets.some(
          (asset) => asset.locationId === subLoc.id
        )
        const hasRelevantSubLocs = getRelevantSubLocations(subLoc.id).length > 0
        return hasRelevantAssets || hasRelevantSubLocs
      })
      return relevantSubLocs
    },
    [assets, locations]
  )

  const shouldDisplayLocation = useMemo(() => {
    const hasRelevantAssets = locationAssets.length > 0
    const hasRelevantComponents = components.length > 0
    const relevantSubLocs = getRelevantSubLocations(location.id)
    const locationSearch = location.name
      .toLowerCase()
      .includes(assetSearchString.toLowerCase())

    return (
      hasRelevantAssets ||
      hasRelevantComponents ||
      relevantSubLocs.length > 0 ||
      locationSearch
    )
  }, [
    locationAssets.length,
    components.length,
    getRelevantSubLocations,
    location.id,
    location.name,
    assetSearchString
  ])

  const subLocations = useMemo(() => {
    const findRelevantSubLocations = (locId: string): ILocation[] => {
      const subLocs = locations.filter((subLoc) => subLoc.parentId === locId)
      const relevantSubLocs = subLocs.filter((subLoc) => {
        const hasRelevantAssets = assets.some(
          (asset) => asset.locationId === subLoc.id
        )
        const hasRelevantSubLocs =
          !isCritical && !isEnergySensor
            ? findRelevantSubLocations(subLoc.id).length >= 0
            : findRelevantSubLocations(subLoc.id).length > 0
        return hasRelevantAssets || hasRelevantSubLocs
      })
      return relevantSubLocs
    }

    return findRelevantSubLocations(location.id)
  }, [location.id, locations, assets, isCritical, isEnergySensor])

  const hasSubLocations = subLocations.length > 0
  const hasAssets = locationAssets.length > 0
  const hasComponents = components.length > 0

  const toggleCollapse = useCallback(() => {
    if (hasSubLocations || hasAssets || hasComponents) {
      setIsCollapsed((prev) => !prev)
    }
  }, [hasSubLocations, hasAssets, hasComponents])

  const locationComponent = (
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
        {(hasSubLocations || hasAssets || hasComponents) && (
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
        )}
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

  if ((isCritical || isEnergySensor) && assetSearchString === '') {
    return hasAssets || hasComponents || hasSubLocations
      ? locationComponent
      : null
  }

  return shouldDisplayLocation ||
    subLocations.some((subLocation) =>
      subLocation.name.toLowerCase().includes(assetSearchString.toLowerCase())
    )
    ? locationComponent
    : null
}

export default React.memo(MainContainerTreeAssetsLocationUnit)
