import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className="navbar">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user && <Link to="/create">new blog</Link>}
      
      {user ? (
        <span>
          {user.name} logged in <button onClick={logout}>logout</button>
        </span>
      ) : (
        <Link to="/login">login</Link>
      )}
    </div>
  )
}