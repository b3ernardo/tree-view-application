import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { ICompany } from '@/types/types'

interface IMainHeaderCompanyCardProps {
  company: ICompany
}

export default function MainHeaderCompanyCard({
  company
}: IMainHeaderCompanyCardProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = () => {
    if (company?.id) {
      router.push(`/?companyId=${company.id}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        alignItems: 'center',
        backgroundColor:
          searchParams.get('companyId') === company?.id ? '#2188FF' : '#17192D',
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
