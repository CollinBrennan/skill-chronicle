import { getRecentLogs, getTotalMinutesSinceDate } from '@/actions/log-actions'
import { getSkills } from '@/actions/skill-actions'
import { getWeeklyGoal } from '@/actions/users-actions'
import { auth } from '@/auth'
import GoalChartCard from '@/components/goal-chart-card'
import LogDialog from '@/components/log-dialog'
import { RecentLogsCard } from '@/components/recent-logs-card'
import { SkillDialog } from '@/components/skill-dialog'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/')

  const logs = await getRecentLogs(userId)
  const skills = await getSkills(userId)
  const weeklyGoal = await getWeeklyGoal(userId)
  const startDate = getMondayOfCurrentWeek()
  const totalMinutes = await getTotalMinutesSinceDate(userId, startDate)

  return (
    <div className="px-4">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="py-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <LogDialog userId={userId} skills={skills} />
            <SkillDialog />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <GoalChartCard
              weeklyGoal={weeklyGoal}
              totalMinutes={totalMinutes}
              startDate={startDate}
            />
            <RecentLogsCard logs={logs} />
          </div>
        </div>
      </div>
    </div>
  )
}

function getMondayOfCurrentWeek(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 (Sunday) to 6 (Saturday)
  const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek
  const monday = new Date(today)
  monday.setDate(today.getDate() + diff)
  monday.setHours(0, 0, 0, 0)
  return monday
}
