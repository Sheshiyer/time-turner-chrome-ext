import React from 'react'
import { useTime } from '../context/TimeContext'

const ModernClock: React.FC = () => {
  const { currentTime } = useTime()

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Calculate hand angles for analog clock
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30
  const minuteDegrees = (minutes / 60) * 360

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Digital Display */}
      <div className="font-mono text-4xl font-bold">
        {formatTime(currentTime)}
      </div>

      {/* Analog Display */}
      <div className="relative w-24 h-24">
        {/* Clock Face */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-600">
          {/* Hour Markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-36px)`,
                transformOrigin: '50% 50%',
              }}
            />
          ))}

          {/* Hour Hand */}
          <div
            className="absolute top-1/2 left-1/2 w-1 h-[16px] bg-white rounded-full origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${hourDegrees}deg)`,
              transformOrigin: '50% 100%',
            }}
          />

          {/* Minute Hand */}
          <div
            className="absolute top-1/2 left-1/2 w-0.5 h-[24px] bg-white rounded-full origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${minuteDegrees}deg)`,
              transformOrigin: '50% 100%',
            }}
          />

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  )
}

export default ModernClock
