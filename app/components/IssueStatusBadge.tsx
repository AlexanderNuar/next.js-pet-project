import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'

interface Props {
  status: Status
}

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'green' }
> = {
  OPEN: {
    label: 'Открыта',
    color: 'red',
  },
  IN_PROGRESS: {
    label: 'В работе',
    color: 'violet',
  },
  CLOSED: {
    label: 'Закрыта',
    color: 'green',
  },
}

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default IssueStatusBadge
