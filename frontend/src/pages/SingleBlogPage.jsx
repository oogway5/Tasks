import { useEffect, useState, useCallback, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { AuthContext } from '../context/AuthContext'

export default function SingleBlogPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [blog, setBlog] = useState(null)

  const fetchBlog = useCallback(async () => {
    try {
      const result = await blogService.getAll()
      const allBlogs = result.data || result || []
      const foundBlog = allBlogs.find((b) => b.id === id)
      setBlog(foundBlog)
    } catch (error) {
      console.error('Error fetching blog:', error)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line
    fetchBlog()
  }, [fetchBlog])

  const handleLike = async () => {
    try {
      await blogService.likeBlog(blog.id)
      fetchBlog()
    } catch (error) {
      console.error('Error liking blog:', error)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog.id)
        navigate('/') 
      } catch (error) {
        console.error('Error deleting blog:', error)
      }
    }
  }

  if (!blog) return <div>loading...</div>

  const canDelete = user && blog.user && (blog.user.id === user.id || blog.user === user.id)

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {blog.user?.name || blog.user?.username || 'unknown'}
      </div>
      {canDelete && (
        <button onClick={handleDelete}>remove</button>
      )}
    </div>
  )
}