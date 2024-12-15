'use client'

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'
import { ChartConfig, ChartContainer } from './ui/chart'

type Props = {
  weeklyGoal: number
  totalMinutes: number
}

const chartConfig = {
  minutes: {
    label: 'Minutes',
  },
} satisfies ChartConfig

export function GoalChart({ weeklyGoal, totalMinutes }: Props) {
  const goalIsComplete = totalMinutes >= weeklyGoal

  const chartData = [
    {
      minutes: totalMinutes,
      fill: goalIsComplete ? '#95cf3a' : '#000000',
    },
  ]

  return (
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
                      of {weeklyGoal} minutes
                    </tspan>
                    {goalIsComplete && (
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 48}
                        className="fill-muted-foreground font-bold"
                      >
                        ✓
                      </tspan>
                    )}
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
