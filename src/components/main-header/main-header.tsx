import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import MainHeaderCompanyCard from './main-header-company-card/main-header-company-card'
import { ICompany } from '@/types/types'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function MainHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: companies, isPending } = useQuery({
    queryFn: async () => {
      const res = await axios.get('https://fake-api.tractian.com/companies')
      return res.data
    },
    queryKey: ['companies']
  })

  useEffect(() => {
    if (companies && companies.length > 0) {
      const companyIdFromUrl = searchParams.get('companyId')
      const isValidCompanyId = companies.some(
        (company: ICompany) => company.id === companyIdFromUrl
      )

      if (!companyIdFromUrl || !isValidCompanyId) {
        const defaultCompanyId = companies[0].id
        router.replace(`/?companyId=${defaultCompanyId}`)
      }
    }
  }, [companies, searchParams, router])

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
        id='cards-menu-container'
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
