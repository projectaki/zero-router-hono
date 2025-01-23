import { createFileRoute, Outlet } from '@tanstack/react-router'
import { LoggedIn } from '../auth/logged-in'
import { LoggedOut } from '../auth/logged-out'
import { RedirectToHome } from '../auth/redirect-to-route'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <LoggedIn>
        <RedirectToHome />
      </LoggedIn>
      <LoggedOut>
        <Outlet />
      </LoggedOut>
    </>
  )
}
