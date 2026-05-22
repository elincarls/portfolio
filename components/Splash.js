'use client'

import { useEffect } from 'react'
import { useSplash } from '../app/contexts/SplashContext'
import styles from './splash.module.css'

export default function Splash() {
  const { splashComplete, setSplashComplete } = useSplash()

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashComplete(true)
    }, 6000)
    return () => clearTimeout(timer)
  }, [])

  if (splashComplete) return null

  return (
    <div className={styles.splash}>
      <div className={styles['text-animation']}>
        <div className={styles['text-list']}>
          <p>Design Leadership</p>
          <p>User Experience</p>
          <p>Code</p>
        </div>
      </div>
    </div>
  )
}