import { deleteLog } from '@/actions/logActions'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'

type Props = {
  logId: string
}

export default function DeleteLogButton({ logId }: Props) {
  return (
    <form
      action={async () => {
        'use server'
        await deleteLog(logId)
      }}
    >
      <Button variant="destructive" type="submit">
        <Trash2 />
      </Button>
    </form>
  )
}
