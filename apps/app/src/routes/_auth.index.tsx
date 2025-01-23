import { createFileRoute } from '@tanstack/react-router'
import { TestList } from '../components/test-list'

export const Route = createFileRoute('/_auth/')({
  component: HomeComponent,
})

function HomeComponent() {
  return <TestList />
}
