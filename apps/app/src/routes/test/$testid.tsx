import { createFileRoute } from '@tanstack/react-router'
import { useTypedZero } from '../../local/local-provider'
import { useUser } from '../../auth/auth-provider'
import { useQuery } from '@rocicorp/zero/react'

export const Route = createFileRoute('/test/$testid')({
  component: RouteComponent,
})

function RouteComponent() {
  const { testid } = Route.useParams()
  const z = useTypedZero()
  const user = useUser()

  const [item, itemStatus] = useQuery(
    z.query.items.where('id', '=', testid).one(),
  )

  if (itemStatus.type === 'unknown') {
    return null
  }

  if (!item) {
    return null
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">{item.name}</h1>
          <div className="mt-2 flex gap-4 text-sm text-gray-500">
            <span>
              Created {new Date(item.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            <span>•</span>
            <span>
              Updated {new Date(item.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <div className="mt-1 text-gray-900 font-mono text-sm">{item.id}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">User ID</label>
            <div className="mt-1 text-gray-900 font-mono text-sm">{item.userId}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
