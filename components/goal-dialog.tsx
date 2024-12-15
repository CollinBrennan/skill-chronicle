import { auth } from '@/auth'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { getWeeklyGoal, updateWeeklyGoal } from '@/actions/users-actions'
import { revalidatePath } from 'next/cache'
import { Label } from './ui/label'
import { Input } from './ui/input'

export default async function GoalDialog() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return null

  const currentGoal = await getWeeklyGoal(userId)

  async function onUpdateGoal(formData: FormData) {
    'use server'
    const weeklyGoal = Number(formData.get('weeklyGoal')?.toString())
    if (userId && weeklyGoal) {
      updateWeeklyGoal(userId, weeklyGoal)
      revalidatePath('/dashboard')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Weekly Goal</DialogTitle>
          <DialogDescription>
            Update the amount of time you want to spend learning skills each
            week.
          </DialogDescription>
        </DialogHeader>

        <form action={onUpdateGoal}>
          <Label htmlFor="weeklyGoal">Minutes per week</Label>
          <div className="flex gap-2">
            <Input
              id="weeklyGoal"
              name="weeklyGoal"
              defaultValue={currentGoal}
            />
            <Button type="submit">Update</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
