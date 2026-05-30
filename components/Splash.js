'use client'

import { useEffect, useState } from 'react'
import { useSplash } from '@/app/contexts/SplashContext'
import Burst from './Burst'
import BurstMobile from './BurstMobile'
import styles from './splash.module.css'

const FADE_DUR = 600 // ms

export default function Splash() {
  const { splashComplete, setSplashComplete } = useSplash()
  const isDevelopment = false
  const [unmounted, setUnmounted] = useState(false)
  const [isMobile, setIsMobile] = useState(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 740px)')
    setIsMobile(mq.matches)
    const onChange = e => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (splashComplete || isDevelopment) return
    document.body.classList.add('no-scroll')
    return () => document.body.classList.remove('no-scroll')
  }, [splashComplete, isDevelopment])

  useEffect(() => {
    if (isDevelopment) return
    const timer = setTimeout(() => setSplashComplete(true), 5500)
    return () => clearTimeout(timer)
  }, [isDevelopment, setSplashComplete])

  useEffect(() => {
    if (!splashComplete) return
    const timer = setTimeout(() => setUnmounted(true), FADE_DUR)
    return () => clearTimeout(timer)
  }, [splashComplete])

  if (unmounted || isDevelopment) return null
  if (isMobile === null) return null // wait until we know which variant to render

  return (
    <div
      className={`${styles["splash"]} ${splashComplete ? styles["splash-fading"] : ""}`}
    >
      {isMobile ? (
        <BurstMobile />
      ) : (
        <div className={styles["burst-container"]}>
          <Burst />
        </div>
      )}
    </div>
  )
}
