import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import Notification from '../components/Notification'
import blogService from '../services/blogs'

export default function CreateBlogPage() {
  const [notification, setNotification] = useState({ message: null, type: '' })
  const navigate = useNavigate()

  const handleCreate = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
        navigate('/')
      }, 3000)
    } catch {
      setNotification({
        message: 'Failed to create blog',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <Notification message={notification.message} type={notification.type} />
      <BlogForm onCreate={handleCreate} />
    </div>
  )
}