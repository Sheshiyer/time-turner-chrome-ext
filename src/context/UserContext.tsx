import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserData {
  name: string
  birthDate: string
}

interface UserContextType {
  userData: UserData | null
  updateUser: (data: UserData) => void
  isProfileComplete: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    // Load user data from chrome.storage on mount
    chrome.storage.local.get(['userData'], (result) => {
      if (result.userData) {
        setUserData(result.userData)
      }
    })
  }, [])

  const updateUser = (data: UserData) => {
    setUserData(data)
    chrome.storage.local.set({ userData: data })
  }

  return (
    <UserContext.Provider 
      value={{ 
        userData, 
        updateUser,
        isProfileComplete: !!userData?.name && !!userData?.birthDate
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
