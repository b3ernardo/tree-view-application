import Image from 'next/image'

import { useTreeAssetsStore } from '@/stores/tree-assets-store'

export default function MainContainerHeaderCriticalButton() {
  const isCritical = useTreeAssetsStore((state) => state.isCritical)
  const setIsCritical = useTreeAssetsStore((state) => state.setIsCritical)

  const handleClick = () => {
    isCritical ? setIsCritical(false) : setIsCritical(true)
  }

  return (
    <button
      className='main-container-header-buttons'
      onClick={handleClick}
      style={{
        backgroundColor: isCritical ? '#E3EAEF' : 'initial'
      }}
    >
      <Image
        alt='Critical icon'
        height={16}
        src='/critical.png'
        width={16}
      />
      <h4>Crítico</h4>
    </button>
  )
}
