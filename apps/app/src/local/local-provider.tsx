import { Zero } from '@rocicorp/zero'
import { useZero, ZeroProvider } from '@rocicorp/zero/react'
import { schema, type Schema } from './schema/_schema'
import { useEffect, useState } from 'react'
import { useSession } from '../auth/auth-provider'

export const LocalProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const {user} = useSession()
  const [zero, setZero] = useState<Zero<Schema> | null>(null)

  useEffect(() => {
    let z;

    if (user) {
        
        z = new Zero({
          schema,
          userID: user.id,
          auth: user.jwt,
          server: import.meta.env.VITE_SYNC_URL,
          kvStore:
            import.meta.env.MODE === 'development' ? 'mem' : 'idb',
          logLevel: 'info',
        })
    } else {
        z = new Zero({
          schema,
          userID: 'anon',
          server: import.meta.env.VITE_SYNC_URL,
          kvStore:
            import.meta.env.MODE === 'development' ? 'mem' : 'idb',
          logLevel: 'info',
        })
    }

    z.query.items.limit(100).preload()
    setZero(z)

    return () => {
      z.close()
    }
  }, [user])

  if (!zero) {
    console.log('zero is null')
    return null
  }

  return <ZeroProvider zero={zero}>{children}</ZeroProvider>
}

export function useTypedZero() {
  return useZero<typeof schema>()
}
