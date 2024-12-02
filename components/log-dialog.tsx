import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import LogForm from './log-form'

export default function LogDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <span>New log</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Skill</DialogTitle>
          <DialogDescription>{currentFormattedDate()}</DialogDescription>
        </DialogHeader>
        <LogForm />
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
