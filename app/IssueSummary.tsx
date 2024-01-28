import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

type Statuses = {
  label: string
  value: number
  status: Status
}[]

interface IssueSummaryProps {
  open: number
  inProgress: number
  closed: number
}

const IssueSummary = ({ open, closed, inProgress }: IssueSummaryProps) => {
  const containers: Statuses = [
    { label: 'Открытые', value: open, status: 'OPEN' },
    { label: 'В работе', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Закрытые', value: closed, status: 'CLOSED' },
  ]

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

export default IssueSummary
