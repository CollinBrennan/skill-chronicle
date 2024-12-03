import { getRecentLogs } from '@/actions/skillLogActions'
import { auth } from '@/auth'
import LogDialog from '@/components/log-dialog'
import { RecentLogsCard } from '@/components/recent-logs-card'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/')

  const logs = await getRecentLogs(userId)

  return (
    <div className="px-2">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="py-4">
        <LogDialog userId={userId} />
        <div className="grid grid-cols-12 bg-blue-500">
          <div className="col-span-6">
            <RecentLogsCard logs={logs} />
          </div>
        </div>
      </div>
    </div>
  )
}
