import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result.data || result || [])
    }
    fetchBlogs()
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-style">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}