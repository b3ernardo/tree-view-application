import Image from 'next/image'

import { useTreeAssetsStore } from '@/stores/tree-assets-store'

export default function MainContainerTreeSearchBox() {
  const setAssetSearchString = useTreeAssetsStore(
    (state) => state.setAssetSearchString
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssetSearchString(event.target.value)
  }

  return (
    <div
      style={{
        alignItems: 'center',
        border: '1px solid #E3EAEF',
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        padding: '1px 12px 0px 0px'
      }}
    >
      <input
        onChange={handleInputChange}
        placeholder='Buscar Ativo ou Local'
        style={{
          border: 'none',
          outline: 'none',
          padding: '16px',
          width: '100%'
        }}
        type='text'
      />

      <Image
        alt='Search icon'
        height={16}
        src='/search.png'
        width={16}
      />
    </div>
  )
}
