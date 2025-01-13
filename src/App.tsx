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
        <div className="w-full h-full bg-[var(--surface-darker)] text-white flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h1 className="text-lg font-semibold">Time Turner</h1>
            <button 
              onClick={() => setShowProfile(!showProfile)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <UserCircleIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-[400px] aspect-square">
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
