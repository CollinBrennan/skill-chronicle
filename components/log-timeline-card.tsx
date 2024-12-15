'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { LogTimelineData } from '@/types/types'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import {
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  setDate,
  setDay,
  setMonth,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns'
import { useEffect, useState, useTransition } from 'react'
import { getLogTimelineDataSinceDate } from '@/actions/log-actions'

const chartConfig = {
  week: {
    label: 'Month',
  },
} satisfies ChartConfig

type Props = {
  userId: string
}

type ChartData = {
  interval: string
  minutes: number | null
}

enum TimeInterval {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export default function LogTimelineCard({ userId }: Props) {
  const [_, startTransition] = useTransition()
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    onIntervalChange(TimeInterval.WEEK)
  }, [])

  function onIntervalChange(timeInterval: TimeInterval) {
    const today = new Date()
    let startOfInterval = startOfWeek
    let numOfIntervals = 7
    let getInterval = getDay
    let intervalFormatter = (interval: number) =>
      format(setDay(today, interval), 'EEEEE')
    let description = 'week'

    if (timeInterval === TimeInterval.MONTH) {
      startOfInterval = startOfMonth
      numOfIntervals = getDaysInMonth(today)
      getInterval = getDate
      intervalFormatter = (interval: number) =>
        format(setDate(today, interval + 1), 'd')
      description = 'month'
    } else if (timeInterval === TimeInterval.YEAR) {
      startOfInterval = startOfYear
      numOfIntervals = 12
      getInterval = getMonth
      intervalFormatter = (interval: number) =>
        format(setMonth(today, interval), 'MMM')
      description = 'year'
    }

    startTransition(async () => {
      const logs = await getLogTimelineDataSinceDate(
        userId,
        startOfInterval(today)
      )
      setChartData(() => {
        return minutesPerInterval(
          logs,
          numOfIntervals,
          getInterval,
          intervalFormatter
        )
      })
      setDescription(description)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Timeline</CardTitle>
        <CardDescription>
          Showing total minutes logged this {description}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-80 w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="interval"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="minutes" fill="#000000" radius={2} />
          </BarChart>
        </ChartContainer>
        <Tabs
          defaultValue={TimeInterval.WEEK}
          onValueChange={(value) => onIntervalChange(value as TimeInterval)}
          className="pt-4"
        >
          <TabsList>
            <TabsTrigger value={TimeInterval.WEEK}>Week</TabsTrigger>
            <TabsTrigger value={TimeInterval.MONTH}>Month</TabsTrigger>
            <TabsTrigger value={TimeInterval.YEAR}>Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function minutesPerInterval(
  logs: LogTimelineData[],
  numOfIntervals: number,
  getInterval: (date: Date) => number,
  intervalFormatter: (interval: number) => string
): ChartData[] {
  const minutesPerInterval: number[] = new Array(numOfIntervals).fill(0)
  for (const log of logs) {
    minutesPerInterval[getInterval(log.date)] += log.minutes
  }

  return minutesPerInterval.map((minutes, interval) => ({
    interval: intervalFormatter(interval),
    minutes: minutes === 0 ? null : minutes,
  }))
}
