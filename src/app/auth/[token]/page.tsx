'use client'

import Home from '@/app/page'
import { redirectTo } from '@/utils/redirectUrl'
import { useRequestApi } from '@/utils/useRequestApi'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Auth() {
  const { token } = useParams()
  const { requestApi } = useRequestApi()

  useEffect(() => {
    if (!token) {
      return
    }
    requestApi({
      path: `/auth/email/${token}`,
      method: 'GET',
      onError: () => redirectTo('/auth')
    }).then(() => {
      redirectTo('/home', true)
    })
  }, [token])

  return <Home></Home>
}
