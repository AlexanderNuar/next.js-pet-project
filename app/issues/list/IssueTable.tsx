import { ArrowUpIcon } from '@radix-ui/react-icons'
import { IssueStatusBadge, Link } from '@/app/components'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import { Issue, Status } from '@prisma/client'

export interface IssueQuery {
  status: Status
  orderBy: keyof Issue
  page: string
}

interface IssueTableProps {
  searchParams: IssueQuery
  issues: Issue[]
}

const IssueTable = ({ issues, searchParams }: IssueTableProps) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: column.value },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toLocaleString().split(',')[0]}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

const columns: {
  label: string
  value: keyof Issue
  className?: string
}[] = [
  { label: 'Задачи', value: 'title' },
  { label: 'Статус', value: 'status', className: 'hidden md:table-cell' },
  {
    label: 'Дата Создания',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
]

export const columnNames = columns.map((column) => column.value)

export default IssueTable
