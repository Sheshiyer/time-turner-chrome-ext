import React from 'react'
import { useTime } from '../context/TimeContext'

const BiorhythmDisplay: React.FC = () => {
  const { biorhythm } = useTime()

  const formatPercentage = (value: number) => {
    return Math.round(value * 100)
  }

  const getArrowDirection = (value: number) => {
    if (value > 0.1) return '↑'
    if (value < -0.1) return '↓'
    return '→'
  }

  const cycles = [
    { name: 'Physical', value: biorhythm.physical, color: 'physical' },
    { name: 'Emotional', value: biorhythm.emotional, color: 'emotional' },
    { name: 'Intellectual', value: biorhythm.intellectual, color: 'intellectual' },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold text-center">Biorhythm</h2>

      <div className="relative h-32 w-full">
        {/* Center line */}
        <div className="absolute top-1/2 w-full h-px bg-gray-600" />

        {/* Wave segments */}
        {cycles.map((cycle, index) => {
          const yOffset = cycle.value * 50 // 50% of container height
          const baseTop = 64 // Half of container height (32px)

          return (
            <div
              key={cycle.name}
              className={`absolute left-0 w-full h-px bg-${cycle.color}`}
              style={{
                top: `${baseTop - yOffset}px`,
              }}
            />
          )
        })}
      </div>

      {/* Cycle indicators */}
      <div className="grid grid-cols-3 gap-4">
        {cycles.map((cycle) => (
          <div
            key={cycle.name}
            className="flex flex-col items-center text-center"
          >
            <div className="text-sm font-medium">{cycle.name}</div>
            <div className={`text-lg font-bold text-${cycle.color}`}>
              {formatPercentage(cycle.value)}%
            </div>
            <div className="text-xl">{getArrowDirection(cycle.value)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BiorhythmDisplay
