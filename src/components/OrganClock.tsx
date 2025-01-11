import React from 'react'
import { useTime } from '../context/TimeContext'

const ORGANS = [
  { name: 'Liver', function: 'Detoxification & Planning' },
  { name: 'Lung', function: 'Breathing & Letting Go' },
  { name: 'Large Intestine', function: 'Elimination' },
  { name: 'Stomach', function: 'Breaking Down' },
  { name: 'Spleen', function: 'Transformation' },
  { name: 'Heart', function: 'Joy & Circulation' },
  { name: 'Small Intestine', function: 'Sorting & Processing' },
  { name: 'Bladder', function: 'Storage & Release' },
  { name: 'Kidney', function: 'Vitality & Willpower' },
  { name: 'Pericardium', function: 'Protection & Relationships' },
  { name: 'Triple Burner', function: 'Temperature & Fluid' },
  { name: 'Gallbladder', function: 'Decision Making' },
]

const OrganClock: React.FC = () => {
  const { organHour, currentTime } = useTime()
  const currentOrgan = ORGANS[organHour]
  const nextOrgan = ORGANS[(organHour + 1) % 12]
  
  // Calculate minutes until next transition
  const minutes = currentTime.getMinutes()
  const minutesUntilTransition = 120 - (minutes + (currentTime.getHours() % 2) * 60)

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-semibold">TCM Body Clock</h2>
      
      {/* Current Organ Display */}
      <div className="text-center">
        <div className="text-xl font-bold text-yellow-400">{currentOrgan.name}</div>
        <div className="text-sm text-gray-300">{currentOrgan.function}</div>
      </div>

      {/* Organ Wheel */}
      <div className="relative w-48 h-48">
        {ORGANS.map((organ, index) => {
          const isActive = index === organHour
          const angle = (index * 30) - 90 // -90 to start at 12 o'clock
          const radius = 80 // pixels
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius

          return (
            <div
              key={organ.name}
              className={`absolute w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 
                ${isActive ? 'bg-yellow-400 w-3 h-3' : 'bg-gray-400'}`}
              style={{
                left: `${x + 96}px`, // 96 = container width/2
                top: `${y + 96}px`,
              }}
            />
          )
        })}
        
        {/* Energy Flow Line */}
        <div
          className="absolute top-1/2 left-1/2 w-1 bg-blue-400/30 rounded-full origin-bottom transform -translate-x-1/2"
          style={{
            height: '80px',
            transform: `translateX(-50%) rotate(${organHour * 30}deg)`,
            transformOrigin: '50% 100%',
          }}
        />
      </div>

      {/* Next Transition */}
      <div className="text-center text-sm">
        <div className="text-gray-400">Next: {nextOrgan.name}</div>
        <div className="text-gray-500">in {minutesUntilTransition} minutes</div>
      </div>
    </div>
  )
}

export default OrganClock
