import { auth } from '@/auth'
import LogDialog from '@/components/log-dialog'
import LogTable from '@/components/log-table'
import { redirect } from 'next/navigation'

export default async function Logs() {
  const session = await auth()

  if (!session?.user?.id) redirect('/')

  return (
    <div className="px-2">
      <h1 className="text-4xl">Logs</h1>
      <div className="py-4">
        <LogDialog userId={session.user.id} />
        <LogTable />
      </div>
    </div>
  )
}
