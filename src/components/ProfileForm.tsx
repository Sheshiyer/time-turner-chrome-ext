import React, { useState } from 'react'
import { useUser } from '../context/UserContext'

const ProfileForm: React.FC = () => {
  const { userData, updateUser } = useUser()
  const [isEditing, setIsEditing] = useState(!userData)
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    birthDate: userData?.birthDate || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUser(formData)
    setIsEditing(false)
  }

  if (!isEditing && userData) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Profile</h2>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Edit
          </button>
        </div>
        <div className="space-y-2">
          <p>
            <span className="text-gray-400">Name:</span> {userData.name}
          </p>
          <p>
            <span className="text-gray-400">Birth Date:</span>{' '}
            {new Date(userData.birthDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">
        {userData ? 'Edit Profile' : 'Complete Your Profile'}
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate" className="block text-sm text-gray-400 mb-1">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          {userData && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {userData ? 'Save Changes' : 'Save Profile'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
