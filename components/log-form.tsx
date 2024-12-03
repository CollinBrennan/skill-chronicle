'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { insertLog } from '@/actions/skillLogActions'

const formSchema = z.object({
  name: z.string().min(1).max(255).trim().toLowerCase(),
  hours: z.coerce.number().int().nonnegative().default(0),
  minutes: z.coerce.number().int().nonnegative().default(0),
  note: z.string().max(255).trim().default(''),
})

type Props = {
  userId: string | undefined
}

export default function LogForm({ userId }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      hours: 0,
      minutes: 30,
      note: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (userId) insertLog({ ...values, userId })
  }

  return (
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
        <Button type="submit" className="float-end">
          Submit
        </Button>
      </form>
    </Form>
  )
}
