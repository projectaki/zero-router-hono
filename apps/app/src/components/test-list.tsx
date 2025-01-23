import { useQuery } from '@rocicorp/zero/react'
import { useUser } from '../auth/auth-provider'
import { useTypedZero } from '../local/local-provider'
import { new_id } from '@local/utils/id'
import { Link } from '@tanstack/react-router'

export function TestList() {
  const z = useTypedZero()
  const user = useUser()

  const [items, itemsStatus] = useQuery(
    z.query.items.orderBy('createdAt', 'desc').limit(100),
  )

  if (itemsStatus.type === 'unknown') {
    return null
  }

  async function createRow() {
    const id = new_id()

    await z.mutate.items.insert({
      id,
      name: `item-${id}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      userId: user.id,
    })
  }

  async function deleteRow(id: string) {
    await z.mutate.items.delete({ id })
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tests
        </h1>
        <button
          onMouseDown={createRow}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Row
        </button>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {items.map((item) => (
          <Link
            to='/test/$testid'
            params={{ testid: item.id }}
            key={item.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group"
          >
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {item.name}
              </span>
              <span className="text-sm text-gray-500">
                Created{' '}
                {new Date(item.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Updated{' '}
                {new Date(item.updatedAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </span>
              <button
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  deleteRow(item.id)
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-red-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
