import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Navbar } from '../components/navbar'
import { LoggedIn } from '../auth/logged-in'
import { LoggedOut } from '../auth/logged-out'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <LoggedIn>
        <div className="h-screen flex flex-col">
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </LoggedIn>
      <LoggedOut>
        <main className="h-screen">
          <Outlet />
        </main>
      </LoggedOut>
    </>
  )
}
