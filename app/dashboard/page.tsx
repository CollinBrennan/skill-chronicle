import LogDialog from '@/components/log-dialog'
import Timer from '@/components/timer'

export default async function Dashboard() {
  return (
    <div>
      <div className="px-2 ">
        <h1 className="text-4xl">Dashboard</h1>
        <div className="py-4">
          <LogDialog />
        </div>
      </div>
    </div>
  )
}
