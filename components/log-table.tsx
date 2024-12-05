import { deleteLog, getLogs } from '@/actions/log-actions'
import { auth } from '@/auth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { redirect } from 'next/navigation'
import DeleteLogButton from './delete-log-button'
import { format } from 'date-fns'

export default async function LogTable() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) redirect('/')

  const logs = await getLogs(userId)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Skill</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{format(log.date, 'PP')}</TableCell>
            <TableCell>{log.skillName}</TableCell>
            <TableCell>{toFormattedDuration(log.minutes)}</TableCell>
            <TableCell>
              {log.note.length > 0 ? (
                log.note
              ) : (
                <span className="italic">empty</span>
              )}
            </TableCell>
            <TableCell className="float-right">
              <DeleteLogButton logId={log.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function toFormattedDuration(minutes: number): string {
  const hours = Math.round((minutes / 60) * 10) / 10
  return minutes >= 60 ? hours + 'h' : minutes + 'm'
}
