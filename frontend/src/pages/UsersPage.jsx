import { useEffect, useState } from 'react'
import usersService from '../services/users'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usersService.getAll()
        setUsers(data)
      } catch (err) {
        setError(err.response?.data?.error || err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <p className="page">Loading users...</p>
  if (error) return <p className="page error">{error}</p>

  return (
    <div className="page">
      <h1>Users</h1>

      <div className="list-grid">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <p>Blogs: {user.blogs?.length || 0}</p>

            <ul>
              {user.blogs?.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}