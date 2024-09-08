import Image from 'next/image'

import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { ICompany } from '@/types/tree-assets-types'

interface IMainHeaderCompanyCardProps {
  company: ICompany
}

export default function MainHeaderCompanyCard({
  company
}: IMainHeaderCompanyCardProps) {
  const companyId = useTreeAssetsStore((state) => state.companyId)
  const setCompanyId = useTreeAssetsStore((state) => state.setCompanyId)
  const setCompanyName = useTreeAssetsStore((state) => state.setCompanyName)

  const handleClick = () => {
    if (company?.id) {
      setCompanyId(company.id)
      setCompanyName(company.name)
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        alignItems: 'center',
        backgroundColor: companyId === company?.id ? '#2188FF' : '#023B78',
        borderRadius: '2px',
        color: '#FFFFFF',
        cursor: 'pointer',
        display: 'flex',
        fontSize: '12px',
        fontWeight: 600,
        gap: '8px',
        padding: '4px 8px 4px 8px'
      }}
    >
      <Image
        alt='Company logo'
        height={12}
        src='/company.png'
        width={14}
      />
      {company?.name} Unit
    </div>
  )
}
