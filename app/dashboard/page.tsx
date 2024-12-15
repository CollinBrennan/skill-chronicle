import { getRecentLogs, getTotalMinutesSinceDate } from '@/actions/log-actions'
import { getSkills } from '@/actions/skill-actions'
import { auth } from '@/auth'
import GoalChartCard from '@/components/goal-chart-card'
import LogDialog from '@/components/log-dialog'
import LogTimelineCard from '@/components/log-timeline-card'
import { RecentLogsCard } from '@/components/recent-logs-card'
import { SkillDialog } from '@/components/skill-dialog'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/')

  const recentLogs = await getRecentLogs(userId)
  const skills = await getSkills(userId)

  return (
    <div className="px-4 w-full max-w-screen-xl">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="py-16">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <LogDialog userId={userId} skills={skills} />
            <SkillDialog />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <GoalChartCard />
            <RecentLogsCard logs={recentLogs} />
          </div>
          <div>
            <LogTimelineCard userId={userId} />
          </div>
        </div>
      </div>
    </div>
  )
}
