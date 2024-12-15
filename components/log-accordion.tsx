import { deleteLog } from '@/actions/log-actions'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { LogData } from '@/types/types'
import { format } from 'date-fns'
import { Button } from './ui/button'

type Props = {
  logs: LogData[]
}

export default async function LogAccordion({ logs }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <div className="flex w-full font-bold">
        <div className="w-1/4">Date</div>
        <div className="w-2/4">Skill</div>
        <div className="w-1/4">Duration</div>
        <div className="w-4"></div>
      </div>
      {logs.map((log) => (
        <AccordionItem key={log.id} value={log.id}>
          <AccordionTrigger className="text-left font-normal">
            <div className="flex w-full">
              <div className="w-1/4">{format(log.date, 'MMM d, yyyy')}</div>
              <div className="w-2/4">{log.skillName}</div>
              <div className="w-1/4">{toFormattedDuration(log.minutes)}</div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {log.note ? (
              <>
                <span className="font-bold">Note:</span> {log.note}
              </>
            ) : (
              <span className="italic">No note</span>
            )}
            <form className="pt-4 flex gap-2 justify-end">
              <Button
                formAction={async () => {
                  'use server'
                  await deleteLog(log.id)
                }}
                variant="destructive"
                type="submit"
              >
                Delete log
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function toFormattedDuration(minutes: number): string {
  const hours = Math.round((minutes / 60) * 10) / 10
  return minutes >= 60 ? hours + 'h' : minutes + 'm'
}
