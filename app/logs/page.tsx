import { getLogs } from '@/actions/log-actions'
import { auth } from '@/auth'
import LogAccordion from '@/components/log-accordion'
import { redirect } from 'next/navigation'

export default async function Logs() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/')

  const logs = await getLogs(userId)

  return (
    <div className="px-4 w-full max-w-screen-xl">
      <h1 className="text-4xl">Logs</h1>
      <div className="py-16">
        <LogAccordion logs={logs} />
      </div>
    </div>
  )
}
