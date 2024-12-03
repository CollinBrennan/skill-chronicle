import { deleteLog, getLogs } from '@/actions/skillLogActions'
import { auth } from '@/auth'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { redirect } from 'next/navigation'
import { Button } from './ui/button'
import DeleteLogButton from './delete-log-button'

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
            <TableCell>{toFormattedDate(log.createdAt)}</TableCell>
            <TableCell>{log.name}</TableCell>
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

function toFormattedDate(date: Date): string {
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

  return formattedDate
}

function toFormattedDuration(minutes: number): string {
  const hours = Math.round((minutes / 60) * 10) / 10
  return minutes >= 60 ? hours + 'h' : minutes + 'm'
}
