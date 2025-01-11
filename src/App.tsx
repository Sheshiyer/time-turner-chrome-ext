import React, { useState } from 'react'
import ModernClock from './components/ModernClock'
import OrganClock from './components/OrganClock'
import BiorhythmDisplay from './components/BiorhythmDisplay'
import ProfileForm from './components/ProfileForm'
import { TimeProvider } from './context/TimeContext'
import { UserProvider, useUser } from './context/UserContext'

// Layer visibility controls
const LayerControls: React.FC<{
  activeLayers: string[]
  onToggleLayer: (layer: string) => void
}> = ({ activeLayers, onToggleLayer }) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-full bg-black/30 backdrop-blur-sm">
      {['clock', 'organ', 'biorhythm'].map((layer) => (
        <button
          key={layer}
          onClick={() => onToggleLayer(layer)}
          className={`px-4 py-1 rounded-full transition-all duration-300 ${
            activeLayers.includes(layer)
              ? 'bg-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]'
              : 'bg-transparent text-white/50 hover:bg-white/10'
          }`}
        >
          {layer.charAt(0).toUpperCase() + layer.slice(1)}
        </button>
      ))}
    </div>
  )
}

const MainContent: React.FC = () => {
  const { isProfileComplete } = useUser()
  const [activeLayers, setActiveLayers] = useState(['clock', 'organ', 'biorhythm'])
  const [focusedLayer, setFocusedLayer] = useState<string | null>(null)

  const toggleLayer = (layer: string) => {
    setActiveLayers((current) =>
      current.includes(layer)
        ? current.filter((l) => l !== layer)
        : [...current, layer]
    )
  }

  if (!isProfileComplete) {
    return <ProfileForm />
  }

  const getLayerStyle = (layer: string): React.CSSProperties => {
    const isActive = activeLayers.includes(layer)
    const isFocused = focusedLayer === layer
    const baseOpacity = isActive ? 1 : 0
    const focusOpacity = isFocused ? 1 : focusedLayer ? 0.4 : 1

    return {
      opacity: baseOpacity * focusOpacity,
      transform: `scale(${isActive ? 1 : 0.9})`,
      pointerEvents: isActive ? 'auto' : 'none',
      transition: 'all 0.3s ease-in-out',
    } as React.CSSProperties
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Layers Container */}
      <div 
        className="relative w-[320px] h-[320px]"
        onMouseLeave={() => setFocusedLayer(null)}
      >
        {/* Base Layer - Clock */}
        <div
          className="absolute inset-0 z-[1]"
          style={getLayerStyle('clock')}
          onMouseEnter={() => setFocusedLayer('clock')}
        >
          <ModernClock />
        </div>

        {/* Primary Overlay - Organ Clock */}
        <div
          className="absolute inset-0 z-[10]"
          style={getLayerStyle('organ')}
          onMouseEnter={() => setFocusedLayer('organ')}
        >
          <OrganClock />
        </div>

        {/* Secondary Overlay - Biorhythm */}
        <div
          className="absolute inset-0 z-[20]"
          style={getLayerStyle('biorhythm')}
          onMouseEnter={() => setFocusedLayer('biorhythm')}
        >
          <BiorhythmDisplay />
        </div>
      </div>

      {/* Layer Controls */}
      <LayerControls
        activeLayers={activeLayers}
        onToggleLayer={toggleLayer}
      />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <UserProvider>
      <TimeProvider>
        <div className="w-full h-full bg-[var(--surface-darker)] text-white">
          <MainContent />
        </div>
      </TimeProvider>
    </UserProvider>
  )
}

export default App
