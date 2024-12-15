'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
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
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
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
  minutes: number
}

enum TimeInterval {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export default function LogTimelineCard({ userId }: Props) {
  const [isPending, startTransition] = useTransition()
  const [chartData, setChartData] = useState<ChartData[]>([])

  useEffect(() => {
    onIntervalChange(TimeInterval.WEEK)
  }, [])

  function onIntervalChange(timeInterval: TimeInterval) {
    const today = new Date()
    let startOfInterval = startOfWeek
    let numOfIntervals = 7
    let getInterval = getDay

    switch (timeInterval) {
      case TimeInterval.MONTH:
        startOfInterval = startOfMonth
        numOfIntervals = getDaysInMonth(today)
        getInterval = getDate
        break
      case TimeInterval.YEAR:
        startOfInterval = startOfYear
        numOfIntervals = 12
        getInterval = getMonth
        break
    }
    startTransition(async () => {
      const logs = await getLogTimelineDataSinceDate(
        userId,
        startOfInterval(today)
      )

      setChartData(() => {
        return minutesPerInterval(logs, numOfIntervals, getInterval)
      })
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Timeline</CardTitle>
        <CardDescription>Add description later.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-80 w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 26,
              right: 26,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="interval"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="minutes"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={1}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
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
  getInterval: (date: Date) => number
): ChartData[] {
  const minutesPerInterval: number[] = new Array(numOfIntervals).fill(0)
  for (let log of logs) {
    minutesPerInterval[getInterval(log.date)] += log.minutes
  }

  return minutesPerInterval.map((minutes, interval) => ({
    interval: interval.toString(),
    minutes,
  }))
}
