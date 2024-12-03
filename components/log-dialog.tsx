'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { z } from 'zod'
import { insertLog } from '@/actions/skillLogActions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from './ui/form'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(1).max(255).trim().toLowerCase(),
  hours: z.coerce.number().int().nonnegative().default(0),
  minutes: z.coerce.number().int().nonnegative().default(0),
  note: z.string().max(255).trim().default(''),
})

type Props = {
  userId: string
}

export default function LogDialog({ userId }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      hours: 0,
      minutes: 30,
      note: '',
    },
  })

  const { isSubmitting, isSubmitSuccessful } = form.formState

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (userId) insertLog({ ...values, userId })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsOpen(false)
      form.reset()
    }
  }, [isSubmitSuccessful])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New log</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Skill</DialogTitle>
          <DialogDescription>{currentFormattedDate()}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill name</FormLabel>
                  <FormControl>
                    <Input placeholder="Skateboarding" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minutes</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Practiced kickflips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isSubmitting ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="float-end">
                Submit
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

function currentFormattedDate(): string {
  const currentDate = new Date()

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })

  return formattedDate
}
