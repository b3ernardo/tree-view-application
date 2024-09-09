'use client'

import MainContainer from '@/components/main-container/main-container'
import MainHeader from '@/components/main-header/main-header'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({})

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      >
        <div
          style={{
            left: 0,
            position: 'fixed',
            top: 0,
            width: '100%'
          }}
        >
          <MainHeader />
        </div>
        <div style={{ flex: 1, marginTop: '55px', overflow: 'auto' }}>
          <MainContainer />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
