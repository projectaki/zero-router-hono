import { createContext, useContext } from 'react'
import { api } from '../lib/api';
import useSWR from 'swr';
import { auth } from '../lib/auth';
import { type InferResponseType } from 'hono/client';
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthInner()

  if (auth.isLoading) {
    console.log('auth isLoading')
    return null
  }

  if (auth.error) {
    console.error(auth.error)
    return null
  }

  return <AuthContext.Provider value={{
    user: auth.user!,
    authorize: auth.authorize,
    logout: auth.logout,
  }}>{children}</AuthContext.Provider>
}

const useAuthInner = () => {
  const getUser = api.auth.user.$get;

  const {
    data: user,
    isLoading,
    error,
    mutate,
  } = useSWR(
    '/api/auth/user',
    async () => {
      const res = await getUser()
      const user = await res.json()

      return user
    },
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  const authorize = async () => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/api/auth/callback`)
    // if (next) {
    //   url.searchParams.set('next', next)
    // }

    const { url: authUrl } = await auth.authorize(url.toString(), "code")

    window.location.href = authUrl
  }

  const logout = async () => {
    await api.auth.logout.$post()
    mutate()
  }

  return {
    user,
    error,
    isLoading,
    authorize,
    logout,
  }
}

const AuthContext = createContext<{
  user: InferResponseType<typeof api.auth.user.$get>
  authorize: () => Promise<void>
  logout: () => Promise<void>
}>(
  {
    user: null,
    authorize: async () => {},
    logout: async () => {},
  }
)


export function useSession() {
  const auth = useContext(AuthContext)

  if (!auth) {
    throw new Error('Auth context must be used within an AuthProvider')
  }

  return auth
}

export function useUser() {
  const { user } = useSession()

  if (!user) {
    throw new Error('This hook can only be used when user is in an authenticated context')
  }

  return user
}
