'use client'
import { useRef, useState } from 'react'

export default function Timer() {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const timer = useRef<NodeJS.Timeout>()
  const startTime = useRef(0)

  function start() {
    if (!isRunning) {
      startTime.current = Date.now() - elapsedTime
      timer.current = setInterval(update, 10)
      setIsRunning(true)
    }
  }

  function pause() {
    if (isRunning) {
      clearInterval(timer.current)
      setElapsedTime(Date.now() - startTime.current)
      setIsRunning(false)
    }
  }

  function reset() {
    clearInterval(timer.current)
    startTime.current = 0
    setElapsedTime(0)
    setIsRunning(false)
  }

  function update() {
    const currentTime = Date.now()
    setElapsedTime(currentTime - startTime.current)
  }

  return (
    <div>
      <div>Elapsed time: {millisToFormattedTime(elapsedTime)}</div>
      {!isRunning ? (
        <button onClick={start}>Start</button>
      ) : (
        <button onClick={pause}>Pause</button>
      )}

      <button onClick={reset}>Reset</button>
    </div>
  )
}

function millisToFormattedTime(millis: number): string {
  const hours = Math.floor(millis / 3600000)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((millis % 3600000) / 60000)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor((millis % 60000) / 1000)
    .toString()
    .padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
