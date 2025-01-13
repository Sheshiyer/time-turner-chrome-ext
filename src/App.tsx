import React, { useState, useEffect } from 'react'
import AlethiometerClock from './components/AlethiometerClock'
import WelcomeIntro from './components/WelcomeIntro'
import { TimeProvider } from './context/TimeContext'
import { UserProvider } from './context/UserContext'
import { UserCircleIcon } from '@heroicons/react/24/outline'

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(() => {
    // Check localStorage on initial render
    return !localStorage.getItem('hasVisitedBefore');
  });
  const [showProfile, setShowProfile] = useState(false);

  const handleWelcomeComplete = () => {
    localStorage.setItem('hasVisitedBefore', 'true');
    setShowWelcome(false);
  };

  if (showWelcome) {
    return (
      <div className="w-full h-full">
        <WelcomeIntro onComplete={handleWelcomeComplete} />
      </div>
    );
  }

  return (
    <UserProvider>
      <TimeProvider>
        <div className="w-full h-full bg-[var(--surface-darker)] text-white relative">
          {/* Header - Absolute positioned */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-[var(--surface-darker)]/80 backdrop-blur-sm z-10">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-[#F6F2C0] to-[#CB9B51] bg-clip-text text-transparent">Time Turner</h1>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="p-1.5 hover:bg-white/5 rounded-full transition-colors border border-white/10"
            >
              <UserCircleIcon className="w-5 h-5" />
            </button>
          </div>
          
          {/* Main content - Centered */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[85%] max-w-[360px] aspect-square">
              <AlethiometerClock 
                birthDate="1991-08-13" 
                birthTime="13:31" 
                birthPlace="Bangalore" 
              />
            </div>
          </div>
        </div>
      </TimeProvider>
    </UserProvider>
  )
}

export default App
