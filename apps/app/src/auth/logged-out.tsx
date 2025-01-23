import { useSession } from "./auth-provider"

export function LoggedOut({ children }: { children: React.ReactNode }) {
  const { user } = useSession()

  if (user) {
    return null
  }

  return <>{children}</>
}
