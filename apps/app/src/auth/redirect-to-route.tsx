import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export function RedirectToHome() {
  const routeTo = useNavigate()

  useEffect(() => {
    routeTo({ to: '/' })
  }, [])

  return null
}
