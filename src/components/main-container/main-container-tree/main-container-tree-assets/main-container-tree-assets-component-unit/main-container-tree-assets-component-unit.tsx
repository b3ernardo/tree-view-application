import Image from 'next/image'
import React from 'react'

import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { IAsset } from '@/types/tree-assets-types'

interface MainContainerTreeAssetsComponentUnitProps {
  component: IAsset
}

function MainContainerTreeAssetsComponentUnit({
  component
}: MainContainerTreeAssetsComponentUnitProps) {
  const selectedUnitId = useTreeAssetsStore((state) => state.selectedUnitId)
  const setSelectedUnitId = useTreeAssetsStore(
    (state) => state.setSelectedUnitId
  )

  const renderStatusIndicator = () => {
    if (
      component.sensorType === 'vibration' ||
      (component.sensorType === null && component.status !== null)
    ) {
      return (
        <div
          style={{
            backgroundColor:
              component.status === 'operating' ? '#52C41A' : '#ED3833',
            borderRadius: '50%',
            height: '10px',
            width: '10px'
          }}
        />
      )
    }

    if (component.sensorType === 'energy') {
      const imageSrc =
        component.status === 'operating'
          ? '/green-energy.png'
          : '/red-energy.png'
      return (
        <Image
          alt={`Energy ${component.status}`}
          height={16}
          src={imageSrc}
          style={{ paddingTop: '4px' }}
          width={9}
        />
      )
    }

    return null
  }

  const handleClick = () => {
    if (selectedUnitId === component.id) {
      setSelectedUnitId('')
    } else {
      setSelectedUnitId(component.id)
    }
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <div
        onClick={handleClick}
        style={{
          alignItems: 'center',
          backgroundColor:
            selectedUnitId === component.id ? '#2188FF' : 'initial',
          color: selectedUnitId === component.id ? '#FFFFFF' : '#17192D',
          cursor: 'pointer',
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-start',
          padding: '4px'
        }}
      >
        <Image
          alt='Component icon'
          height={22}
          src={
            selectedUnitId === component.id
              ? '/component-selected.png'
              : '/component.png'
          }
          width={22}
        />
        <div className='text-assets'>{component.name}</div>
        {renderStatusIndicator()}
      </div>
    </div>
  )
}

export default React.memo(MainContainerTreeAssetsComponentUnit)
