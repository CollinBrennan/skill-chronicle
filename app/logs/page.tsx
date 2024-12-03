import LogDialog from '@/components/log-dialog'
import LogTable from '@/components/log-table'

export default function Logs() {
  return (
    <div className="px-2">
      <h1 className="text-4xl">Logs</h1>
      <div className="py-4">
        <LogDialog />
        <LogTable />
      </div>
    </div>
  )
}
