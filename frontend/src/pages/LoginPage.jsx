import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import Notification from '../components/Notification'
import { AuthContext } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (username, password) => {
    try {
      await login(username, password)
      navigate('/')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} type="error" />
      <LoginForm onLogin={handleLogin} />
    </div>
  )
}