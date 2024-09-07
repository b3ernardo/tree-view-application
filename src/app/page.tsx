'use client'

import MainHeader from '@/components/main-header/main-header'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({})

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainHeader />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
