import { createFileRoute } from '@tanstack/react-router'
import { LoggedIn } from '../auth/logged-in'
import { RedirectToHome } from '../auth/redirect-to-route'
import { LoggedOut } from '../auth/logged-out'
import { useSession } from '../auth/auth-provider'
import { PagePadding } from '../components/page-padding'

export const Route = createFileRoute('/_public/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const { authorize } = useSession()

  return (
    <>
      <PagePadding className="h-full">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-md w-full -mt-32">
            <button
              onClick={() => authorize()}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </div>
      </PagePadding>
    </>
  )
}
