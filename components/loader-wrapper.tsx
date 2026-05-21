'use client'

import React from 'react'
import { Loader } from './loader'

export function LoaderWrapper() {
  const [show, setShow] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null
  return <Loader />
}
