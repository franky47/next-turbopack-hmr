import { Suspense } from 'react'
import { Client } from '../client'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  )
}
