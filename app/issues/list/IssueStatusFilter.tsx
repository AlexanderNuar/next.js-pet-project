'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const statuses: { label: string; value?: Status }[] = [
  { label: 'Все' },
  { label: 'Открыта', value: 'OPEN' },
  { label: 'В процессе', value: 'IN_PROGRESS' },
  { label: 'Закрыта', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  const router = useRouter()

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : ''
        router.push('/issues/list' + query)
      }}
    >
      {/* @ts-ignore */}
      <Select.Trigger placeholder="Сортировать по статусу..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || ''}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter
