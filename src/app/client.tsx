'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useCallback, useOptimistic } from 'react'

function useMiniNuqs({ shallow = true }: { shallow?: boolean } = {}) {
  const router = useRouter()
  const uSP = useSearchParams()
  const [searchParams, setOptimisticSearchParams] = useOptimistic(
    new URLSearchParams(uSP)
  )
  const state = searchParams.get('test') ?? ''
  const setState = useCallback(
    (value: string | null) => {
      const searchParams = new URLSearchParams(location.search)
      if (value) {
        searchParams.set('test', value)
      } else {
        searchParams.delete('test')
      }
      startTransition(() => {
        setOptimisticSearchParams(searchParams)
        if (shallow) {
          history.replaceState(null, '', `/?${searchParams.toString()}`)
        } else {
          router.replace(`/?${searchParams.toString()}`)
        }
      })
    },
    [router, setOptimisticSearchParams, shallow]
  )
  return [state, setState] as const
}

export function Client() {
  const [state, setState] = useMiniNuqs({
    // focus switching occurs when shallow: false, with both webpack & turbopack
    shallow: false,
  })

  return (
    <>
      <input placeholder="2. this will focus" />
      <input
        placeholder="1. type here"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <div>Change this for HMR</div>
    </>
  )
}
