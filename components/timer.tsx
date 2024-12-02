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

  function stop() {
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
      <div>Elapsed time: {elapsedTime}</div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
