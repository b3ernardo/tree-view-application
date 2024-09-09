import Image from 'next/image'
import { useMemo } from 'react'

import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { IAsset } from '@/types/tree-assets-types'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function MainContainerComponentDetails() {
  const companyId = useTreeAssetsStore((state) => state.companyId)
  const selectedUnitId = useTreeAssetsStore((state) => state.selectedUnitId)

  const { data: assets, isSuccess } = useQuery<IAsset[]>({
    queryFn: async () => {
      const res = await axios.get(
        `https://fake-api.tractian.com/companies/${companyId}/assets`
      )
      return res.data
    },
    queryKey: ['companies', companyId, 'assets']
  })

  const componentToBeDetailed = useMemo(() => {
    if (isSuccess && assets) {
      return assets.find((asset) => selectedUnitId === asset.id)
    } else {
      return undefined
    }
  }, [assets, isSuccess, selectedUnitId])

  const renderStatusIndicator = () => {
    if (componentToBeDetailed) {
      if (
        componentToBeDetailed.sensorType === 'vibration' ||
        (componentToBeDetailed.sensorType === null &&
          componentToBeDetailed.status !== null)
      ) {
        return (
          <div
            style={{
              backgroundColor:
                componentToBeDetailed.status === 'operating'
                  ? '#52C41A'
                  : '#ED3833',
              borderRadius: '50%',
              height: '10px',
              width: '10px'
            }}
          />
        )
      }

      if (componentToBeDetailed.sensorType === 'energy') {
        const imageSrc =
          componentToBeDetailed.status === 'operating'
            ? '/green-energy.png'
            : '/red-energy.png'
        return (
          <Image
            alt={`Energy ${componentToBeDetailed.status}`}
            height={16}
            src={imageSrc}
            style={{ paddingTop: '4px' }}
            width={9}
          />
        )
      }
    }

    return null
  }

  const handleImage = () => {
    if (componentToBeDetailed?.name.toLowerCase().includes('motor')) {
      return '/motor.png'
    } else if (componentToBeDetailed?.name.toLowerCase().includes('sensor')) {
      return '/valve.png'
    } else {
      return '/no-image.png'
    }
  }

  const handleType = () => {
    if (componentToBeDetailed?.name.toLowerCase().includes('motor')) {
      return 'Motor Elétrico (Trifásico)'
    } else if (componentToBeDetailed?.name.toLowerCase().includes('sensor')) {
      return 'Sensor'
    } else {
      return 'Sem dados'
    }
  }

  const handleResponsible = () => {
    if (componentToBeDetailed?.sensorType === 'vibration') {
      return 'Mecânica'
    } else if (componentToBeDetailed?.sensorType === 'energy') {
      return 'Elétrica'
    } else {
      return 'Sem dados'
    }
  }

  return (
    <div style={{ border: '1px solid #E3EAEF', height: '95%' }}>
      <header
        style={{
          alignItems: 'center',
          borderBottom: '1px solid #E3EAEF',
          display: 'flex',
          gap: '8px',
          height: '49.67px',
          justifyContent: 'flex-start',
          paddingLeft: '16px'
        }}
      >
        {componentToBeDetailed && (
          <>
            <h3>{componentToBeDetailed.name}</h3>
            {componentToBeDetailed.status && renderStatusIndicator()}
          </>
        )}
      </header>

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '32px'
        }}
      >
        <div className='component-details-grid'>
          <Image
            alt='Component image'
            height={226}
            src={handleImage()}
            style={{
              cursor: componentToBeDetailed?.sensorType ? 'default' : 'pointer'
            }}
            width={336}
          />

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <h4 style={{ margin: 0 }}>Tipo de Equipamento</h4>
              <p style={{ color: '#88929C', margin: 0 }}>{handleType()}</p>
            </div>

            <hr
              style={{
                backgroundColor: '#E3EAEF',
                border: 'none',
                height: '1px',
                margin: 0
              }}
            />

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <h4 style={{ margin: 0 }}>Responsáveis</h4>
              <div
                style={{ alignItems: 'center', display: 'flex', gap: '8px' }}
              >
                {componentToBeDetailed?.sensorType && (
                  <Image
                    alt='Sensor icon'
                    height={24}
                    src={
                      componentToBeDetailed.sensorType === 'energy'
                        ? '/elec.png'
                        : '/mec.png'
                    }
                    width={24}
                  />
                )}
                <p style={{ color: '#88929C', margin: 0 }}>
                  {handleResponsible()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr
          style={{
            backgroundColor: '#E3EAEF',
            border: 'none',
            height: '1px',
            margin: 0
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr'
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <h4 style={{ margin: 0 }}>Sensor</h4>
            <span
              style={{
                alignItems: 'center',
                color: '#88929C',
                display: 'flex',
                fontSize: '16px',
                gap: '8px',
                margin: 0
              }}
            >
              <Image
                alt='Sensor icon'
                height={14}
                src='/sensor.png'
                width={16}
              />
              {componentToBeDetailed?.sensorId || 'Sem dados'}
            </span>
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <h4 style={{ margin: 0 }}>Receptor</h4>
            <span
              style={{
                alignItems: 'center',
                color: '#88929C',
                display: 'flex',
                fontSize: '16px',
                gap: '8px',
                margin: 0
              }}
            >
              <Image
                alt='Receptor icon'
                height={14}
                src='/receptor.png'
                width={16}
              />
              {componentToBeDetailed?.gatewayId || 'Sem dados'}
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
