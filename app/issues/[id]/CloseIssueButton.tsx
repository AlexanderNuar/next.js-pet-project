'use client'
import { Spinner } from '@/app/components'
import { Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CloseIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const closeIssue = async () => {
    try {
      // throw new Error()
      setIsClosing(true)
      await axios.put('/api/issues/' + issueId)
      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setIsClosing(false)
      setError(true)
    }
  }

  return (
    <Button color="green" disabled={isClosing} onClick={closeIssue}>
      Закрыть
      {isClosing && <Spinner />}
    </Button>
  )
}

export default CloseIssueButton
