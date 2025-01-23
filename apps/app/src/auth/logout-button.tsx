import { useSession } from "./auth-provider"

export function LogoutButton() {
  const { logout } = useSession()

  return (
    <button
      onClick={async () => {
        await logout()
      }}
      className="appearance-none"
    >
      Logout
    </button>
  )
}
