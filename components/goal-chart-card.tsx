'use client'

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import Link from 'next/link'
import { format } from 'date-fns'

type Props = {
  totalMinutes: number
  weeklyGoal: number
  startDate: Date
}

export default function GoalChartCard({
  totalMinutes,
  weeklyGoal,
  startDate,
}: Props) {
  const chartData = [{ minutes: totalMinutes }]

  const chartConfig = {
    minutes: {
      label: 'Minutes',
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader>
        <CardTitle>Weekly Goal</CardTitle>
        <CardDescription>
          Since {format(startDate, 'EEEE, MMM d')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex h-full">
        <ChartContainer config={chartConfig} className="w-48 min-h-48">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={90 + 360 * Math.min(totalMinutes / weeklyGoal, 1)}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="minutes" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].minutes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Minutes
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <Link href="/logs" className="underline">
          Edit goal
        </Link>
      </CardFooter>
    </Card>
  )
}
