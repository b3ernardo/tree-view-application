import MainContainerHeaderCriticalButton from './main-container-header-critical-button/main-container-header-critical-button'
import MainContainerHeaderEnergySensorButton from './main-container-header-energy-sensor-button/main-container-header-energy-sensor-button'
import { useTreeAssetsStore } from '@/stores/tree-assets-store'

export default function MainContainerHeader() {
  const companyName = useTreeAssetsStore((state) => state.companyName)

  return (
    <div
      className='main-container-header'
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <span style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
        <h2>Ativos</h2>
        <p style={{ color: '#24292F' }}>
          {companyName && `/ ${companyName} Unit`}
        </p>
      </span>

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          justifyContent: 'center'
        }}
      >
        <MainContainerHeaderEnergySensorButton />
        <MainContainerHeaderCriticalButton />
      </div>
    </div>
  )
}
