import { Link } from '@tanstack/react-router'
import { LogoutButton } from '../auth/logout-button'
import { PagePadding } from './page-padding'

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <PagePadding className="h-14 flex items-center">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-base hover:opacity-70 transition-opacity"
          >
            Home
          </Link>
          <Link to="/test" className="text-base hover:opacity-70 transition-opacity">
            Test
          </Link>
          <div className="flex-1" />
          <LogoutButton />
        </div>
      </PagePadding>
    </nav>
  )
}
