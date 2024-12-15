import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { format, startOfWeek } from 'date-fns'
import GoalDialog from './goal-dialog'
import { getWeeklyGoal } from '@/actions/users-actions'
import { getTotalMinutesSinceDate } from '@/actions/log-actions'
import { auth } from '@/auth'
import { GoalChart } from './goal-chart'

export default async function GoalChartCard() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return null

  const startDate = startOfWeek(new Date())
  const weeklyGoal = await getWeeklyGoal(userId)
  const totalMinutes = await getTotalMinutesSinceDate(userId, startDate)

  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        <CardTitle>Weekly Goal</CardTitle>
        <CardDescription>{format(startDate, 'MMM d')} ~ Today</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full">
        <GoalChart weeklyGoal={weeklyGoal} totalMinutes={totalMinutes} />
      </CardContent>
      <CardFooter>
        <GoalDialog />
      </CardFooter>
    </Card>
  )
}
