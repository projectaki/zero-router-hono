import { createFileRoute } from '@tanstack/react-router'
import { Outlet } from '@tanstack/react-router'
import { LoggedOut } from '../auth/logged-out'
import { LoggedIn } from '../auth/logged-in'
import { RedirectToLogin } from '../auth/redirect-to-login'

export const Route = createFileRoute('/test')({
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
