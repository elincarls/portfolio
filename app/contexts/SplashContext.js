'use client'

import { createContext, useContext, useState } from 'react'

const SplashContext = createContext(null)

export function SplashProvider({ children }) {
  const [splashComplete, setSplashComplete] = useState(false)

  return (
    <SplashContext.Provider value={{ splashComplete, setSplashComplete }}>
      {children}
    </SplashContext.Provider>
  )
}

export function useSplash() {
  const context = useContext(SplashContext)
  if (!context) throw new Error('useSplash must be used within SplashProvider')
  return context
}