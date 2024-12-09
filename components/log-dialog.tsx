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
import { insertLog } from '@/actions/log-actions'
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
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns'
import { Skill } from '@/types/types'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'

const formSchema = z.object({
  skillId: z.string().min(1, 'Please select a skill'),
  hours: z.coerce.number().int().nonnegative().default(0),
  minutes: z.coerce.number().int().nonnegative().default(0),
  note: z.string().max(255).trim().default(''),
  date: z.date().transform((date) => {
    date.setHours(0, 0, 0, 0)
    return date
  }),
})

type Props = {
  userId: string
  skills: Skill[]
}

export default function LogDialog({ userId, skills }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillId: '',
      hours: 0,
      minutes: 30,
      note: '',
      date: new Date(),
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
          <DialogDescription>
            Enter the name of the skill you learned and how long you spent
            learning it.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-[240px] pl-3 text-left font-normal"
                        >
                          {format(field.value, 'PPP')}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skillId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Skill</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[240px] justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <span className="overflow-hidden overflow-ellipsis">
                            {field.value
                              ? skills.find((skill) => skill.id === field.value)
                                  ?.name
                              : 'Select skill'}
                          </span>

                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px] p-0">
                      <Command>
                        <CommandInput placeholder="Search skills..." />
                        <CommandList>
                          <CommandEmpty>No skills found.</CommandEmpty>
                          <CommandGroup>
                            {skills.map((skill) => (
                              <CommandItem
                                value={skill.name}
                                key={skill.id}
                                onSelect={() => {
                                  form.setValue('skillId', skill.id)
                                }}
                              >
                                {skill.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    skill.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
