'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSplash } from '@/app/contexts/SplashContext'

export default function Home() {
  const { splashComplete } = useSplash()
  const router = useRouter()

  useEffect(() => {
    if (splashComplete) {
      router.replace('/projects')
    }
  }, [splashComplete])

  return null
}
