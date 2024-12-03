import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import LogForm from './log-form'
import { Button } from './ui/button'
import { auth } from '@/auth'

export default async function LogDialog() {
  const session = await auth()
  const userId = session?.user?.id

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New log</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Skill</DialogTitle>
          <DialogDescription>{currentFormattedDate()}</DialogDescription>
        </DialogHeader>
        <LogForm userId={userId} />
      </DialogContent>
    </Dialog>
  )
}

function currentFormattedDate(): string {
  const currentDate = new Date()

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })

  return formattedDate
}
