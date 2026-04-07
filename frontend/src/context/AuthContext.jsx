import { createContext, useEffect, useState } from 'react'
import authService from '../services/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedBlogUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoadingAuth(false)
  }, [])

  const login = async (username, password) => {
    const loggedUser = await authService.login({ username, password })
    localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
    setUser(loggedUser)
    return loggedUser
  }

  const logout = () => {
    localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  )
}