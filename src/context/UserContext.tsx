import React, { createContext, useContext, useEffect, useState } from 'react'

interface Location {
  address: string
  lat: number
  lng: number
}

interface UserData {
  name: string
  birthDate: string
  birthTime: string
  location: Location
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
    // Load user data from storage on mount
    const loadUserData = async () => {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        // Chrome extension environment
        chrome.storage.local.get(['userData'], (result) => {
          if (result.userData) {
            setUserData(result.userData)
          }
        })
      } else {
        // Development environment
        const storedData = localStorage.getItem('userData')
        if (storedData) {
          setUserData(JSON.parse(storedData))
        }
      }
    }
    loadUserData()
  }, [])

  const updateUser = (data: UserData) => {
    setUserData(data)
    if (typeof chrome !== 'undefined' && chrome.storage) {
      // Chrome extension environment
      chrome.storage.local.set({ userData: data })
    } else {
      // Development environment
      localStorage.setItem('userData', JSON.stringify(data))
    }
  }

  return (
    <UserContext.Provider 
      value={{ 
        userData, 
        updateUser,
        isProfileComplete: !!userData?.name && !!userData?.birthDate && !!userData?.birthTime && !!userData?.location
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
