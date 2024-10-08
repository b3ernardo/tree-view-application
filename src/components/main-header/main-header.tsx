import Image from 'next/image'
import { useEffect } from 'react'

import MainHeaderCompanyCard from './main-header-company-card/main-header-company-card'
import { useTreeAssetsStore } from '@/stores/tree-assets-store'
import { ICompany } from '@/types/tree-assets-types'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function MainHeader() {
  const companyId = useTreeAssetsStore((state) => state.companyId)
  const companyName = useTreeAssetsStore((state) => state.companyName)
  const setCompanyId = useTreeAssetsStore((state) => state.setCompanyId)
  const setCompanyName = useTreeAssetsStore((state) => state.setCompanyName)

  const { data: companies, isPending } = useQuery({
    queryFn: async () => {
      const res = await axios.get('https://fake-api.tractian.com/companies')
      return res.data
    },
    queryKey: ['companies']
  })

  useEffect(() => {
    if (
      companies &&
      companies.length > 0 &&
      (companyId === '' || companyName === '')
    ) {
      setCompanyId(companies[0].id)
      setCompanyName(companies[0].name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies, companyId, companyName])

  return (
    <header
      style={{
        alignItems: 'center',
        backgroundColor: '#17192D',
        display: 'flex',
        gap: '16px',
        justifyContent: 'space-between',
        padding: '16px'
      }}
    >
      <Image
        priority
        alt='TRACTIAN logo'
        height={14}
        src='/tractian.png'
        width={102.95}
      />
      <div
        className='cards-menu-container'
        style={{
          alignItems: 'center',
          display: 'flex',
          gap: '10px'
        }}
      >
        {isPending ? (
          <div className='skeleton-card' />
        ) : (
          companies?.map((company: ICompany) => {
            return (
              <MainHeaderCompanyCard
                company={company}
                key={company.id}
              />
            )
          })
        )}
      </div>
    </header>
  )
}
