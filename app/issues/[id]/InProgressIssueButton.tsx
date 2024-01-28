'use client'

import { Spinner } from '@/app/components'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const InProgressIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isProgressing, setIsProgressing] = useState(false)

  const inProgressIssue = async () => {
    try {
      // throw new Error()
      setIsProgressing(true)
      await axios.head('/api/issues/' + issueId)
      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setIsProgressing(false)
      setError(true)
    }
  }

  return (
    <Button color="gold" disabled={isProgressing} onClick={inProgressIssue}>
      В работу
      {isProgressing && <Spinner />}
    </Button>
  )
}

export default InProgressIssueButton
