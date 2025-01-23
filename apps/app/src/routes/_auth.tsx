import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LoggedOut } from '../auth/logged-out'
import { RedirectToLogin } from '../auth/redirect-to-login'
import { LoggedIn } from '../auth/logged-in'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LoggedIn>
        <Outlet />
      </LoggedIn>
      <LoggedOut>
        <RedirectToLogin />
      </LoggedOut>
    </>
  )
}
