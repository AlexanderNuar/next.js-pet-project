import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'
import CloseIssueButton from './CloseIssueButton'
import InProgressIssueButton from './InProgressIssueButton'

interface Props {
  params: { id: string }
}

const fetch = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
)

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions)

  if (isNaN(parseInt(params.id))) notFound()

  const issue = await fetch(parseInt(params.id))

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            {issue.status !== 'CLOSED' && (
              <CloseIssueButton issueId={issue.id} />
            )}
            {issue.status === 'OPEN' && (
              <InProgressIssueButton issueId={issue.id} />
            )}
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  )
}
export async function generateMetadata({ params }: Props) {
  const issue = await fetch(parseInt(params.id))

  return {
    title: issue?.title,
    description: 'Details of issue' + issue?.id,
  }
}

export default IssueDetailPage
