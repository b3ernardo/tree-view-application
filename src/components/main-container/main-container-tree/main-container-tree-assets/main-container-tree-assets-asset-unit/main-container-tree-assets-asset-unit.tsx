import Image from 'next/image'
import { useState } from 'react'

import MainContainerTreeAssetsComponentUnit from '../main-container-tree-assets-component-unit/main-container-tree-assets-component-unit'
import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { IAsset } from '@/types/tree-assets-types'

interface MainContainerTreeAssetsAssetUnitProps {
  asset: IAsset
  assets: IAsset[]
}

export default function MainContainerTreeAssetsAssetUnit({
  asset,
  assets
}: MainContainerTreeAssetsAssetUnitProps) {
  const selectedUnitId = useTreeAssetsStore((state) => state.selectedUnitId)
  const setSelectedUnitId = useTreeAssetsStore(
    (state) => state.setSelectedUnitId
  )
  const [isCollapsed, setIsCollapsed] = useState(true)

  const components = assets.filter(
    (comp) => comp.parentId === asset.id && comp.sensorType
  )
  const subAssets = assets.filter(
    (subAsset) =>
      subAsset.parentId === asset.id &&
      !components.some((component) => component.name === subAsset.name) &&
      !subAsset.sensorType
  )

  const hasSubAssets = subAssets.length > 0
  const hasComponents = components.length > 0

  const handleClick = () => {
    if (hasSubAssets || hasComponents) {
      setIsCollapsed(!isCollapsed)
    } else {
      if (selectedUnitId === asset.id) {
        setSelectedUnitId('')
      } else {
        setSelectedUnitId(asset.id)
      }
    }
  }

  const renderStatusIndicator = () => {
    if (
      asset.sensorType === 'vibration' ||
      (asset.sensorType === null && asset.status !== null)
    ) {
      return (
        <div
          style={{
            backgroundColor:
              asset.status === 'operating' ? '#52C41A' : '#ED3833',
            borderRadius: '50%',
            height: '10px',
            width: '10px'
          }}
        />
      )
    }

    if (asset.sensorType === 'energy') {
      const imageSrc =
        asset.status === 'operating' ? '/green-energy.png' : '/red-energy.png'
      return (
        <Image
          alt={`Energy ${asset.status}`}
          height={16}
          src={imageSrc}
          style={{ paddingTop: '4px' }}
          width={9}
        />
      )
    }

    return null
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <div
        onClick={handleClick}
        style={{
          alignItems: 'center',
          backgroundColor: selectedUnitId === asset.id ? '#2188FF' : 'initial',
          color: selectedUnitId === asset.id ? '#FFFFFF' : '#17192D',
          cursor: hasSubAssets || hasComponents ? 'default' : 'pointer',
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-start',
          padding: '4px'
        }}
      >
        {hasSubAssets || hasComponents ? (
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
          alt='Asset icon'
          height={22}
          src={
            selectedUnitId === asset.id ? '/asset-selected.png' : '/asset.png'
          }
          width={22}
        />
        <div className='text-assets'>{asset.name}</div>
        {renderStatusIndicator()}
      </div>
      {!isCollapsed && (
        <>
          {subAssets.map((subAsset) => (
            <MainContainerTreeAssetsAssetUnit
              asset={subAsset}
              assets={assets}
              key={subAsset.id}
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
