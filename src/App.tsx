import React from 'react'
import ModernClock from './components/ModernClock'
import OrganClock from './components/OrganClock'
import BiorhythmDisplay from './components/BiorhythmDisplay'
import ProfileForm from './components/ProfileForm'
import { TimeProvider } from './context/TimeContext'
import { UserProvider, useUser } from './context/UserContext'

const MainContent: React.FC = () => {
  const { isProfileComplete } = useUser()

  if (!isProfileComplete) {
    return <ProfileForm />
  }

  return (
    <>
      <ProfileForm />
      <ModernClock />
      <OrganClock />
      <BiorhythmDisplay />
    </>
  )
}

const App: React.FC = () => {
  return (
    <UserProvider>
      <TimeProvider>
        <div className="w-full h-full bg-gray-900 text-white p-4 flex flex-col gap-4 overflow-y-auto">
          <MainContent />
        </div>
      </TimeProvider>
    </UserProvider>
  )
}

export default App
