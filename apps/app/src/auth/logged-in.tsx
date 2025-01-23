import { useSession } from "./auth-provider"

export function LoggedIn({ children }: { children: React.ReactNode }) {
  const { user } = useSession()

  if (!user) {
    return null
  }

  return <>{children}</>
}
