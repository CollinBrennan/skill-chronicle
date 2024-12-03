import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LogData } from '@/types/types'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { format } from 'date-fns'

type Props = {
  logs: LogData[]
}

export async function RecentLogsCard({ logs }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Logs</CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableCell>{log.name}</TableCell>
                <TableCell>{toFormattedDuration(log.minutes)}</TableCell>
                <TableCell>
                  {log.note.length > 0 ? (
                    log.note
                  ) : (
                    <span className="italic">empty</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Link href="/logs" className="underline">
          View all
        </Link>
      </CardFooter>
    </Card>
  )
}

function toFormattedDuration(minutes: number): string {
  const hours = Math.round((minutes / 60) * 10) / 10
  return minutes >= 60 ? hours + 'h' : minutes + 'm'
}
