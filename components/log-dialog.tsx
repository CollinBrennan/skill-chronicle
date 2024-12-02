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

export default function LogDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>New log</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Skill</DialogTitle>
          <DialogDescription>{currentFormattedDate()}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Skill name</Label>
            <Input
              id="name"
              placeholder="Skateboarding"
              className="col-span-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="hours">Duration</Label>
            <div className="flex gap-4 items-center">
              <Input id="hours" placeholder="0" />
              <Label htmlFor="hours">Hours</Label>
              <Input id="minutes" placeholder="0" />
              <Label htmlFor="minutes">Minutes</Label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="I felt good about today."
              className="col-span-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Log skill</Button>
        </DialogFooter>
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
