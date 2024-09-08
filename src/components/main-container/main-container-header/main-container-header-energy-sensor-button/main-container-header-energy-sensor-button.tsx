import Image from 'next/image'

import { useTreeAssetsStore } from '@/stores/tree-assets-store'

export default function MainContainerHeaderEnergySensorButton() {
  const isEnergySensor = useTreeAssetsStore((state) => state.isEnergySensor)
  const setIsEnergySensor = useTreeAssetsStore(
    (state) => state.setIsEnergySensor
  )

  const handleClick = () => {
    isEnergySensor ? setIsEnergySensor(false) : setIsEnergySensor(true)
  }

  return (
    <button
      className='main-container-header-buttons'
      onClick={handleClick}
      style={{
        backgroundColor: isEnergySensor ? '#E3EAEF' : 'initial'
      }}
    >
      <Image
        alt='Energy Sensor icon'
        height={16}
        src='/energy.png'
        width={16}
      />
      <h4>Sensor de Energia</h4>
    </button>
  )
}
