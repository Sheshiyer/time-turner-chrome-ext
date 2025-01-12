import React from 'react'
import AlethiometerClock from './components/AlethiometerClock'
import { TimeProvider } from './context/TimeContext'
import { UserProvider } from './context/UserContext'

const App: React.FC = () => {
  return (
    <UserProvider>
      <TimeProvider>
        <div className="w-full h-full bg-[var(--surface-darker)] text-white flex items-center justify-center">
          <div className="w-[400px] h-[400px]">
            <AlethiometerClock 
              birthDate="1991-08-13" 
              birthTime="13:31" 
              birthPlace="Bangalore" 
            />
          </div>
        </div>
      </TimeProvider>
    </UserProvider>
  )
}

export default App
