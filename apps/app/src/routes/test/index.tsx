import { createFileRoute } from '@tanstack/react-router'
import { TestList } from '../../components/test-list'

export const Route = createFileRoute('/test/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TestList />
}
