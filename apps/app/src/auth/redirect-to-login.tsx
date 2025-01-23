import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

export function RedirectToLogin() {
  const routeTo = useNavigate()
  const location = useLocation()

  useEffect(() => {
    routeTo({ to: '/signin' })
  }, [])

  return null
}
