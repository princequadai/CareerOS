import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('careeros_user')
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      console.error('Failed to parse user from localStorage', e)
      return null
    }
  })

  const login = (email, role, name) => {
    const userData = { email, role, name }
    setUser(userData)
    localStorage.setItem('careeros_user', JSON.stringify(userData))
    
    const welcomeName = name || (role.charAt(0).toUpperCase() + role.slice(1))
    toast.success(`Welcome back, ${welcomeName}!`, {
      icon: '👋',
      theme: 'colored',
      style: { background: '#2563eb', color: '#fff' }
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('careeros_user')
    toast.info('Logged out successfully', {
      icon: '🔒',
      theme: 'colored',
      style: { background: '#1e293b', color: '#fff' }
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
